<template>
  <div class="time-picker">
    <div class="time">
      <div class="hour">
        <input
          type="number"
          placeholder="--"
          min="1"
          max="12"
          v-model="hour"
          @click.prevent="toggleHour"
        />
        <div class="hour-options" v-if="showHour">
          <span
            v-for="i in hourArray"
            :key="i"
            @click.prevent="pick"
            id="hour"
            >{{ i }}</span
          >
        </div>
      </div>

      <div class="sep">:</div>
      <div class="minute">
        <input
          type="number"
          placeholder="--"
          min="0"
          max="60"
          step="15"
          v-model="minute"
          @click="toggleMin"
        />
        <div class="min-options" v-if="showMin">
          <span
            v-for="i in minArray"
            :key="i"
            @click.prevent="pick"
            id="minute"
            >{{ i }}</span
          >
        </div>
      </div>
      <div class="dayTime">
        <select name="" id="" v-model="dayTime">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
    <hr />
    <div class="action-btngroup">
      <button>Reset</button>
      <button @click.prevent="submitTime">Ok</button>
    </div>
  </div>

  <!-- <span v-for="(time,index) in times" 
          :key="index"
          @click.prevent="selectTime"
          >{{time}}</span> -->
</template>

<script>
import { format } from "date-fns";
export default {
  data() {
    return {
      now: new Date(),
      hourArray: [],
      minArray:[],
      hour: "",
      minute: "",
      dayTime: "AM",
      showHour: false,
      showMin: false
    };
  },
  methods: {
    submitTime() {
      // eslint-disable-next-line no-console
      // console.log(e.target.innerText)
      if (this.hour !== "" && this.minute !== "") {
        this.$emit("timeSelected", [this.hour, this.minute, this.dayTime]);
        this.hour = "";
        this.minute = "";
        this.dayTime = "AM";
      }
    },
    toggleHour() {
      this.showHour = !this.showHour;
      this.showMin = false;
    },
    toggleMin() {
      this.showMin = !this.showMin;
      this.showHour = false;
    },
    pick(e) {
      if (e.target.id === "hour") {
        this.hour = e.target.innerText.length===1 ? `0${e.target.innerText}`:e.target.innerText;
        this.showHour = false;
      } else if (e.target.id === "minute") {
        this.minute = e.target.innerText;
        this.showMin = false;
      }
    }
  },
  computed: {
    presentHour() {
      return format(this.now, "hh:mm a");
    }
  },
  mounted() {
    let array = [];
    for (let i = 1; i < 13; i++) {
      array.push(i);
    }
    this.hourArray = array;
    this.minArray= ["15", "30", "45", "00"];
  }
};
</script>

<style>
.time-picker {
  /* width: 400px;*/
  max-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  padding: 5px 0px;
  background-color: antiquewhite;
}
.time {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.hour,
.minute,
.dayTime,
.sep {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sep {
  font-size: 1.5rem;
  font-weight: 900;
}
.hour input,
.minute input {
  height: 40px;
  width: 40px;
  text-align: center;
  outline: none;
  font-size: 1.2rem;
  background-color: antiquewhite;
  border: none;
  border-bottom: 1px solid #555;
}
.hour,
.minute {
  position: relative;
}
.hour-options,
.min-options {
  position: absolute;
  bottom: 70%;
  left: -90%;
  z-index: 999;
  /* border:1px solid #555; */
  height: 30px;
  background-color: rgb(143, 124, 97);
  display: flex;
  justify-content: center;
  align-items: center;
}
.min-options {
  bottom: 90%;
  left: 50%;
}
.hour-options span,
.min-options span {
  /* display: block; */
  text-align: center;
  padding: 5px;
  cursor: pointer;
  color: #fff;
}
.hour-options span:hover,
.min-options span:hover {
  background-color: blanchedalmond;
  color: #555;
}
.action-btngroup {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15 5px;
  height: 43px;
  margin-top: 10px;
}
.action-btngroup button {
  margin-right: 25px;
  font-size: 1.1rem;
  background-color: transparent;
  padding: 5px 10px;
  border: 1px solid #555;
  outline: none;
  cursor: pointer;
}
.action-btngroup button:hover {
  background: #555;
  color: white;
}
</style>
