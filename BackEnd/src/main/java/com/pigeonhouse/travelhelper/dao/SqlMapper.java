package com.pigeonhouse.travelhelper.dao;

import com.pigeonhouse.travelhelper.entity.*;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
@Repository
@Mapper
public interface SqlMapper {

    /**
     * selectHotelByCity
     * @param city
     * @return List<Hotel>
     */
    @Select("SELECT * FROM `hotel` where city = #{city}")
    List<Hotel> selectHotelByCity(String city);


    /**
     * selectOrderByCity
     * @param city
     * @return
     */
    @Select("SELECT * FROM `order` where roomId in (SELECT roomId FROM room where hotelId in (SELECT hotelId FROM hotel where city = #{city}))")
    List<Order> selectOrderByCity(String city);


    /**
     * selectOrderByCity
     * @param hotelId
     * @return
     */
    @Select("SELECT * FROM `order` where roomId in (SELECT roomId FROM room where hotelId =#{hotelId})")
    List<Order> selectOrderByHotel(int hotelId);



    /**
     * selectRoomByCity
     * @param city
     * @return
     */
    @Select("SELECT * FROM `room` where hotelId in (SELECT hotelId FROM hotel where city = #{city})")
    List<Room> selectRoomByCity(String city);

    /**
     * selectRoomByHotel
     * @param hotelId
     * @return
     */
    @Select("SELECT * FROM `room` where hotelId = #{hotelId}")
    List<Room> selectRoomByHotel(int hotelId);

    /**
     * selectMemberByTel
     * @param telephone
     * @return
     */
    @Select("SELECT * FROM `member` where telephone = #{telephone}")
    List<Member> selectMemberByTel(String telephone);

    /**
     * selectTransport
     * @param transportType
     * @return
     */
    @Select("SELECT * FROM `transport` where transportType = #{transportType}")
    List<Transport> selectTransport(String transportType);

    /**
     * selectTicketOrderByTransportType
     * @param transportType
     * @return
     */
    @Select("SELECT * FROM `ticketOrder` where transportType = #{transportType}")
    List<TicketOrder> selectTicketOrderByTransportType(String transportType);

    /**
     * insertOrder
     * @param order
     */
    @Insert("INSERT INTO `order` (roomId, telephone, numberOfPeople, startTime, endTime) VALUES ( #{roomId}, #{telephone}, #{numberOfPeople}, #{startTime}, #{endTime})")
    void insertOrder(Order order);

    /**
     * insertMember
     * @param member
     */
    @Insert("INSERT INTO `member` (name,telephone,idCardNumber,passCode) VALUES (#{name}, #{telephone}, #{idCardNumber},#{passCode})")
    void insertMember(Member member);

    /**
     * insertTicketOrder
     * @param ticketOrder
     */
    @Insert("INSERT INTO `ticketOrder` (telephone, transportType, transportId, departureTime, arrivalTime) VALUES ( #{telephone}, #{transportType}, #{transportId}, #{departureTime}, #{arrivalTime})")
    void insertTicketOrder(TicketOrder ticketOrder);

    /**
     * findAll
     * @return
     */
    List<Hotel> findAll();

}
