package com.pigeonhouse.travelhelper.entity;

import java.util.Date;

/**
 * @Author: LanZeJun
 * @Date: 2019/6/11 10:57
 */
public class Transport {
    private String transportId;
    private Date departureTime;
    private Date arrivalTime;
    private int costPerTravel;
    private String transportType;

    public void setTransportType(String transportType) {
        this.transportType = transportType;
    }

    public String getTransportType() {
        return transportType;
    }

    public void setTransportId(String transportId) {
        this.transportId = transportId;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }

    public void setArrivalTime(Date arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public void setCostPerTravel(int costPerTravel) {
        this.costPerTravel = costPerTravel;
    }

    public String getTransportId() {
        return transportId;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public Date getArrivalTime() {
        return arrivalTime;
    }

    public int getCostPerTravel() {
        return costPerTravel;
    }
}
