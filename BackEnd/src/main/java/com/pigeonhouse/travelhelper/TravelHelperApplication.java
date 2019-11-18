package com.pigeonhouse.travelhelper;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
@SpringBootApplication
@MapperScan("com.pigeonhouse..travel_helper.DAO")
public class TravelHelperApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelHelperApplication.class, args);
    }

}
