<template>
  <!-- DISPLAY START -->
  <div class="calendar">
    <div class="display">
      <div class="display-day">
        {{ day }}
      </div>
      <div class="display-date">
        <span>
          <!-- {{presentDate}} -->
          {{
            `${dateOrdinal(currentDate)} ${
              months[currentMonth]
            }, ${currentYear} `
          }}
        </span>
        <span>
          {{ currentTime }}
        </span>
      </div>
      <!-- <div class="display-actions">
        <button @click="mode = 'date'">CAL</button>
        <button @click="mode = 'time'">TIME</button>
      </div> -->
    </div>
    <!-- DISPLAY END -->

    <!-- DATE PICKER-->
    <DatePicker :days="days" :months="months" v-on:dateSelected="updateDate" />
    <!-- TIME PICKER -->
    <TimePicker v-on:timeSelected="updateTime" />
  </div>
</template>

<script>
import startOfMonth from "date-fns/startOfMonth";

import getDay from "date-fns/getDay";
import getDate from "date-fns/getDate";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";

import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import { format, startOfDay, set } from "date-fns";

export default {
  name: "o-calender",
  data() {
    return {
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      presentDate: new Date(),
      mode: "time"
    };
  },
  components: {
    DatePicker,
    TimePicker
  },
  methods: {
    updateDate(value) {
      this.presentDate = value;
    },
    updateTime(value) {
      let [hour, minute, dayTime] = value;

      let tempDate = startOfDay(this.presentDate);
      if (dayTime==="PM" && parseInt(hour) !== 12) {
        hour = parseInt(hour) + 12;
      }
      this.presentDate = set(tempDate, {
        hours: parseInt(hour),
        minutes: parseInt(minute)
      });
     
    },
    dateOrdinal(day) {
      if (day == 31 || day == 21 || day == 1) return day + "st";
      else if (day == 22 || day == 2) return day + "nd";
      else if (day == 23 || day == 3) return day + "rd";
      else return day + "th";
    }
  },
  mounted() {
    this.presentDate = new Date();
  },
  computed: {
    currentMonth() {
      return getMonth(this.presentDate);
    },
    currentYear() {
      return getYear(this.presentDate);
    },
    currentDate() {
      return getDate(this.presentDate);
    },
    currentTime: {
      get() {
        return format(this.presentDate, "hh:mm a");
      }
    },
    day() {
      return this.days[getDay(this.presentDate)];
    },
    startDate() {
      let firstDate = startOfMonth(
        new Date(this.currentYear, this.currentMonth)
      );
      return getDay(firstDate);
    }
  }
};
</script>

<style>
.calendar {
  /* height: 400px; */
  width: 400px;
  border-radius: 5px;
  overflow: hidden;
  margin: auto;
  font-family: sans-serif;
  color: #555;
  box-shadow: -1px 4px 16px -5px rgba(0, 0, 0, 0.64);
}
.display {
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: blanchedalmond;
  color: black;
}
.display .display-day {
  padding: 5px;
  font-size: 1.2rem;
  background-color: rgb(143, 124, 97);
  color: #fff;
}
.display .display-date {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  padding: 20px;
  font-size: 1.4rem;
  font-weight: 700;
}
.display .display-date span {
  padding: 5px 10px;
}
.display .display-actions {
  padding: 10px;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
