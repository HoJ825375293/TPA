package com.pigeonhouse.travelhelper.service.impl;

import com.pigeonhouse.travelhelper.dao.SqlMapper;
import com.pigeonhouse.travelhelper.entity.Hotel;
import com.pigeonhouse.travelhelper.entity.Order;
import com.pigeonhouse.travelhelper.entity.Room;
import com.pigeonhouse.travelhelper.entity.Transport;
import com.pigeonhouse.travelhelper.entity.TicketOrder;
import com.pigeonhouse.travelhelper.service.IProcessor;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
@Mapper
@Repository
public class Processor implements IProcessor {

    @Autowired
    private SqlMapper sqlMapper;

    @Override
    public List<Hotel> queryHotelProcessor(String city, Date RequestStartTime, Date RequestEndTime){

        List<Room> allRoom = sqlMapper.selectRoomByCity(city);
        List<Order> allOrder = sqlMapper.selectOrderByCity(city);
        List<Hotel> allHotel = sqlMapper.selectHotelByCity(city);

        int lengthOfRoom = allRoom.size();
        int lengthOfHotel = allHotel.size();

        for (Order order : allOrder) {
            boolean isSafe = RequestEndTime.before(order.getStartTime()) || RequestStartTime.after(order.getEndTime())
                    || (RequestEndTime.after(order.getStartTime()) && RequestStartTime.after(order.getEndTime()))
                    || (RequestStartTime.before(order.getEndTime()) && RequestEndTime.before(order.getStartTime()));
            if(isSafe) {
                //无冲突，什么也不做
            }else{
                //若出现冲突，则删去该房间
                for (int i = 0; i < lengthOfRoom ; i++) {
                    if(allRoom.get(i).getRoomId() == order.getRoomId()){
                        //将该房间对应的酒店的房间数-1
                        for (int j = 0; j < lengthOfHotel; j++) {
                            if(allRoom.get(i).getHotelId() == allHotel.get(j).getHotelId()){
                                int originNumber = allHotel.get(j).getRoomNumber();
                                allHotel.get(j).setRoomNumber(originNumber-1);
                            }
                        }
                        allRoom.remove(i);
                        lengthOfRoom--;
                        break;
                    }
                }
            }
        }

        //将房间数为0的酒店删去
        for (int i = 0; i < lengthOfHotel; i++) {
            if(allHotel.get(i).getRoomNumber() == 0) {
                allHotel.remove(i);
                i--;
                lengthOfHotel--;
            }
        }
        return allHotel;
    }


    @Override
    public List<Room> queryRoomProcessor(int hotelId, Date RequestStartTime, Date RequestEndTime) {
        List<Room> allRoom = sqlMapper.selectRoomByHotel(hotelId);
        List<Order> allOrder = sqlMapper.selectOrderByHotel(hotelId);
        int lengthOfRoom = allRoom.size();

        for (Order order : allOrder) {
            boolean isSafe = RequestEndTime.before(order.getStartTime()) || RequestStartTime.after(order.getEndTime())
                    || (RequestEndTime.after(order.getStartTime()) && RequestStartTime.after(order.getEndTime()))
                    || (RequestStartTime.before(order.getEndTime()) && RequestEndTime.before(order.getStartTime()));
            if(isSafe) {
                //无冲突，什么也不做
            }else{
                //若出现冲突，则删去该房间
                for (int i = 0; i < lengthOfRoom ; i++) {
                    if(allRoom.get(i).getRoomId() == order.getRoomId()){
                        allRoom.remove(i);
                        lengthOfRoom--;
                        break;
                    }
                }
            }
        }

        return allRoom;
    }

    @Override
    public List<Transport> queryTicketProcessor(String transportType, Date RequestStartTime, Date RequestEndTime){
        //选择合适的类型
        List<Transport> allTransport = sqlMapper.selectTransport(transportType);
        List<TicketOrder> allTicketOrder = sqlMapper.selectTicketOrderByTransportType(transportType);

        int lengthOfTransport = allTransport.size();

        for (TicketOrder ticketOrder : allTicketOrder) {
            //删去订单中的车次/航班
            for (int i = 0; i < lengthOfTransport ; i++) {
                if(allTransport.get(i).getTransportId().equals(ticketOrder.getTransportId()) &&
                    allTransport.get(i).getTransportType().equals(ticketOrder.getTransportType())) {
                    //移除
                    allTransport.remove(i);
                    lengthOfTransport--;
                    break;
                }
            }
        }
        //删除不在时间内的车次
        for (int i = 0; i < lengthOfTransport ; i++) {
            if(RequestEndTime.after(allTransport.get(i).getArrivalTime()) &&
                RequestStartTime.before(allTransport.get(i).getDepartureTime())) {
            }
            else {
                //移除
                allTransport.remove(i);
                lengthOfTransport--;
                i--;
            }
        }

        return allTransport;
    }

    @Override
    public Boolean orderProcessor(Order order) {
        sqlMapper.insertOrder(order);
        return true;
    }

    @Override
    public Boolean ticketOrderProcessor(TicketOrder ticketOrder) {
        sqlMapper.insertTicketOrder(ticketOrder);
        return true;
    }

    @Override
    public List<Hotel> test() {
        return sqlMapper.findAll();
    }
}
