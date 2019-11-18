package com.pigeonhouse.travelhelper.entity;

import java.util.Date;
/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
public class Order {
    private int orderId;
    private int roomId;
    private String telephone;
    private int numberOfPeople;
    private Date startTime;
    private Date endTime;

    public Order(){}

    public Order(int roomId, String telephone, int numberOfPeople, Date startTime, Date endTime) {
        this.roomId = roomId;
        this.telephone = telephone;
        this.numberOfPeople = numberOfPeople;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
