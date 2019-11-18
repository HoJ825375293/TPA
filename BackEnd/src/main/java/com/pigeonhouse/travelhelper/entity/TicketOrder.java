package com.pigeonhouse.travelhelper.entity;

import java.util.Date;

/**
 * @Author: LanZeJun
 * @Date: 2019/6/10 21:03
 */
public class TicketOrder {
    private int TicketOrderId;
    private String transportType;
    private String transportId;
    private Date departureTime;
    private Date arrivalTime;
    private String telephone;

    public TicketOrder(String telephone, String transportType, String transportId, Date departureTime, Date arrivalTime) {
        this.transportType = transportType;
        this.transportId = transportId;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.telephone = telephone;
    }

    public int getTicketOrderId() {
        return TicketOrderId;
    }

    public String getTransportType() {
        return transportType;
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

    public String getTelephone() {
        return telephone;
    }

    public TicketOrder(){}


    public void setTicketOrderId(int ticketOrderId) {
        TicketOrderId = ticketOrderId;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
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

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

}
