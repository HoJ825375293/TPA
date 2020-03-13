package com.pigeonhouse.travelhelper.entity;
/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
public class Room {
    private int hotelId;
    private int roomId;
    private String roomType;
    private int costPerNight;

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getCostPerNight() {
        return costPerNight;
    }

    public void setCostPerNight(int costPerNight) {
        this.costPerNight = costPerNight;
    }
}
