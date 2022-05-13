/*
Carla Elson's Final Project for CSC 2463
*/

#include "PDMSerial.h"
PDMSerial pdm;

//const int analogPin = A0;  //the analog input pin sensor is attached to
const int ledPin = 13;   // A digital input pin
const int ledPin2 = 7;
int led1;
int led2;
int ledFlashing;
int ledOn;

unsigned long previousMillis = 0; // will store last time LED was updated
const long interval = 1000; 


int sensorValue = 0;
int sensorValue2 = 0;
int sensorTransmitValue = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);
 // pinMode(digitalInPin, INPUT_PULLUP);
  
  //pinMode(outPin, OUTPUT);

  Serial.begin(9600);
}

void loop() {
    sensorValue = analogRead(ledPin);//read the value from the analog sensor
    sensorValue2 = analogRead(ledPin2);
    //float sensorFloatValue = sensorValue/1023.0;
    
  pdm.transmitSensor("13", sensorValue);
  pdm.transmitSensor("7", sensorValue2);
  pdm.transmitSensor("ledFlashing", sensorValue);
  pdm.transmitSensor("end");
  
  boolean newData = pdm.checkSerial();
  
  //make LED 1 blink to the music, red LED 2 to fade in and down when game ends
  if(newData) {
    if(pdm.getName().equals(String("led2"))) {
      digitalWrite(ledPin2, pdm.getValue());
      ledFlashing = pdm.getValue();
    } else if (pdm.getName().equals(String("fade"))) {
      analogWrite(ledPin, pdm.getValue());
    }
  }
  
unsigned long currentMillis = millis();

if(ledFlashing == 1){
   if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (led1 == LOW) {
      led1 = HIGH;
    } else {
      led1 = LOW;
    }

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin, led1);
  }
}

 
  
}
