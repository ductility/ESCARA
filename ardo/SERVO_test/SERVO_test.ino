#include<Servo.h>
Servo servo;
int value = 0;

void setup() {
  servo.attach(7);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available())
  {
    char in_data;
    in_data = Serial.read();
    if(in_data == '1')
    {
      value += 30;
      if(value == 180){
      value = 0;}
    }
    else{
      value = 0;
    }

    servo.write(value);
    delay(100);
  }
}

/*

void loop() {

  if(Serial.available()) {

      char c = Serial.read();

//      Serial.write(c);

      if(c == 'X') {

            for(int i = 0 ; i < LED_NUM ; i++) {

                digitalWrite(ledArray[i], LOW) ;

            }

           return;

      }

      int ledNum = c - '1';

      digitalWrite(ledArray[ledNum],!digitalRead(ledArray[ledNum])) ;

  }

}
*/
