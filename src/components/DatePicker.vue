/* eslint-disable no-console */
<template>
  <div class="date-picker">
    <div class="header-display">
      <button class="prev" @click.prevent="goToPrev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
          />
        </svg>
      </button>
      <span class="month-span">
        {{ months[currentMonth] + " " + currentYear }}
      </span>
      <button class="next" @click.prevent="goToNext">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </svg>
      </button>
    </div>
    <!-- Main DateCal -->
    <div class="week-days">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
    <div class="date-grid">
      <div
        v-for="(day, index) in getNum()"
        :key="index"
        :style="{ gridColumn: getFirstDay(index) }"
        :class="{ today: isToday(day) }"
        @click.prevent="emitSelectedDate"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
import isSameDay from "date-fns/isSameDay";
import getDay from "date-fns/getDay";
import { startOfMonth } from "date-fns";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getDate from "date-fns/getDate";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import addMonths from "date-fns/addMonths";
export default {
  props: ["days", "months"],
  data() {
    return {
      myDate: new Date()
    };
  },
  methods: {
    goToNext() {
      this.myDate = addMonths(this.myDate, 1);
    },
    goToPrev() {
      this.myDate = addMonths(this.myDate, -1);
    },
    getFirstDay(i) {
      if (i === 0) {
        const firstDay = startOfMonth(this.myDate);
        return getDay(firstDay) + 1;
      }
    },
    isToday(day) {
      return isSameDay(
        new Date(this.currentYear, this.currentMonth, day),
        new Date()
      );
    },
    getNum() {
      return getDaysInMonth(this.myDate);
    },
    selected(e) {
      //console.log(e)
      let newDate = new Date(
        this.currentYear,
        this.currentMonth,
        +e.target.innerText
      );
      return newDate;
      // eslint-disable-next-line no-console
      
    },
    emitSelectedDate(e) {
      this.$emit("dateSelected", this.selected(e));
    }
  },
  computed: {
    currentMonth() {
      return getMonth(this.myDate);
    },
    currentYear() {
      return getYear(this.myDate);
    },
    currentDate() {
      return getDate(this.myDate);
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
.date-picker {
  width: 400px;
  /* min-height: 480px; */
}
.header-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px;
  /* border: 1px solid red; */
}
.month-span {
  font-size: 1.2rem;
  padding: 5px 0px;
}

.prev,
.next {
  /* background-color:#f6ad55; */
  /* padding: 10px 15px; */
  font-size: 8px;
  background-color: transparent;
  border: none;
}
.week-days {
  font-size: 1.2rem;
  color: black;
}
.week-days,
.date-grid {
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px 5px;
  grid-auto-rows: 45px;
  padding: 10px 8px;
}
.week-days > *,
.date-grid > * {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;
  font-size: 1.2rem;
  border-radius: 100%;
}
.date-grid div:hover{
  background-color: rgb(143, 124, 97);
  color: #fff;
  cursor: pointer;
}
.today {
    background-color: antiquewhite;
}
</style>
