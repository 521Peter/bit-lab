<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="打卡" name="0">
        <h4 style="text-align: center; color: rgb(241, 193, 135)">
          本月你已打卡 {{ curMonthClockDays.succes }} 天
        </h4>
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
          "
        >
          <div class="clock-container sign-in" @click="signIn">
            <div class="clock">
              <div class="clock-text">
                <p class="clock-title">签到</p>
                <p class="clock-time">{{ time }}</p>
              </div>
            </div>
          </div>
          <div
            class="clock-container sign-out"
            @click="signOut"
            style="margin-top: 30px"
          >
            <div class="clock">
              <div class="clock-text">
                <p class="clock-title">签退</p>
                <p class="clock-time">{{ time }}</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="考勤记录" name="1">
        <el-calendar
          v-model="value"
          id="calendar"
          :first-day-of-week="7"
          ref="calendar"
        >
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ data }">
            <!--自定义内容-->
            <div>
              <div class="calendar-day" :class="isSelected[data.day]">
                {{ data.day.slice(-2) }}
              </div>
            </div>
          </template>
        </el-calendar></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { fetchClockRecord, uploadClockRecord } from "network/clock/index";

export default {
  data() {
    return {
      // 用户的公网地址
      userIp: "",
      // 合法的公网地址
      legalIp: ["218.14.83.220", "183.38.213.101"],
      activeName: "0",
      time: "",
      data: new Date(),
      calendarData: [
        {
          months: "01",
          days: [],
        },
        {
          months: "02",
          days: [],
        },
        {
          months: "03",
          days: [],
        },
        {
          months: "04",
          days: [],
        },
        {
          months: "05",
          days: [],
        },
        {
          months: "06",
          days: [],
        },
        {
          months: "07",
          days: [],
        },
        {
          months: "08",
          days: [],
        },
        {
          months: "09",
          days: [],
        },
        {
          months: "10",
          days: [],
        },
        {
          months: "11",
          days: [],
        },
        {
          months: "12",
          days: [],
        },
      ],
      value: new Date(),
      // 有状态的日期
      isSelected: {},
      month: "",
      day: "",
      // 当月打卡天数
      curMonthClockDays: { succes: 0, padding: 0 },
      // 签退时间
      signOutTime: "",
      // 签到时间
      signInTime: "",
      // 本月打卡记录
      curMonthObj: "",
    };
  },
  methods: {
    // 更新时间
    updateTime() {
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      this.time = hours + ":" + minutes;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 签到
    async signIn() {
      if (this.signOutTime) {
        this.$message.error("你已签退，操作不合法");
        return;
      }
      if (this.signInTime) {
        this.$message.error("请勿重复签到");
        return;
      }
      this.userIp = await this.getUserInternetIp();
      if (this.legalIp.includes(this.userIp)) {
        this.signInTime = new Date().getTime();
        // 签到时间保存到本地中
        localStorage.setItem(
          new Date().toISOString().slice(0, 10) + "signIn",
          this.signInTime
        );
        console.log(this.signInTime);
        this.$message.warning("恭喜你，签到成功！");
        // this.updateStatus("padding");
        // this.getCurMonthClockDays();
      } else {
        this.$message.error("打卡失败，请使用规定网络进行打卡！");
      }
    },
    // 签退
    async signOut() {
      this.userIp = await this.getUserInternetIp();
      console.log(this.userIp);
      const nowTime = new Date().getTime();
      const isLegalTime = nowTime - this.signInTime > 120000 ? true : false;
      if (!isLegalTime) {
        this.$message.error("打卡失败，请在规定时间打卡！");
        return;
      }
      if (!this.legalIp.includes(this.userIp)) {
        this.$message.error("打卡失败，请使用规定网络进行打卡！");
        return;
      }
      this.$message.success("恭喜你，签退成功！");
      this.signOutTime = true;
      this.updateStatus("succes");
      this.getCurMonthClockDays();
      // 签退时间保存到本地中
      localStorage.setItem(
        new Date().toISOString().slice(0, 10) + "signOut",
        this.signInTime
      );
    },
    // 更新签到状态
    async updateStatus(msg) {
      let arr = [];
      for (let obj of this.calendarData) {
        if (obj.months === this.month) {
          arr = obj.days;
          break;
        }
      }
      if (arr.map((item) => item[0]).includes(this.day)) {
        for (let day of arr) {
          if (day[0] === this.day) {
            day.splice(1, 1, msg);
            break;
          }
        }
      } else {
        let a = [this.day, msg];
        arr.push(a);
      }
      console.log("arr", arr);
      console.log(this.calendarData);
      // return;
      const res = await uploadClockRecord(this.calendarData);
      console.log("--res", res);
      // this.getSelected();
      // // 修改日期变量,促使日历重新渲染
      // this.value = new Date();
    },
    // 获取用户网络ip
    getUserInternetIp() {
      return new Promise((resolve, reject) => {
        axios
          .get("https://api.ipify.org/?format=json")
          .then((data) => {
            const { ip } = data.data;
            console.log("当前用户的IP地址：", ip);
            resolve(ip);
          })
          .catch((error) => {
            reject(error);
            console.error("获取IP地址时出错：", error);
          });
      });
    },
    // 获取有状态的日期
    getSelected() {
      this.calendarData.forEach((obj) => {
        obj.days.forEach((item) => {
          this.isSelected[`2023-${obj.months}-${item[0]}`] = item[1];
        });
      });
    },
    getTime() {
      let now = new Date();
      this.month = now.getMonth() + 1 + "";
      if (this.month.length === 1) {
        this.month = `0${this.month}`;
      }
      this.day = now.getDate() + "";
      if (this.day.length === 1) {
        this.day = `0${this.day}`;
      }
    },
    // 获取本月打卡天数
    getCurMonthClockDays() {
      // 先重置天数
      this.curMonthClockDays["succes"] = 0;
      this.curMonthClockDays["padding"] = 0;
      this.curMonthObj = this.calendarData.filter(
        (pObj) => pObj.months === this.month
      )[0];
      // 计算
      this.curMonthObj.days.forEach((item) => {
        if (item[1] === "succes" || item[1] === "succes") {
          this.curMonthClockDays["succes"] += 1;
        } else if (item[1] === "padding") {
          this.curMonthClockDays["padding"] += 1;
        }
      });
    },
    async init() {
      this.getTime();
      const res = await fetchClockRecord();
      console.log("!res.data", res.data);
      return;
      // 如果后端有返回的数据就用，否则用本地的
      // this.calendarData =
      //   res.data.length > 0 ? res.data[0].data : this.calendarData;
      // console.log("calendarData", this.calendarData);
      // this.getSelected();
      // this.getCurMonthClockDays();
      // // 修改日期变量,促使日历重新渲染
      // this.value = new Date();
    },
  },
  created() {
    this.signInTime =
      localStorage.getItem(new Date().toISOString().slice(0, 10) + "signIn") ||
      "";
    this.signOutTime =
      localStorage.getItem(new Date().toISOString().slice(0, 10) + "signOut") ||
      "";
    this.init();
  },
  mounted() {
    this.updateTime();
    // 5s 中更新一次时间
    setInterval(this.updateTime, 5000);
  },
};
</script>

<style lang="scss" scoped>
.container {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  padding: 10px;
  // justify-content: center;
}
.clock-container {
  position: relative;
  width: 7rem;
  height: 7rem;
  margin-bottom: 30px;
  // background-color: rgb(247, 186, 72);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  /* filter: blur(.5px); */
  /* 添加虚化效果 */
}
.sign-in {
  background-color: rgb(238, 198, 123);
}

.sign-out {
  background-color: rgb(247, 186, 72);
}

.clock {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  // background-color: orange;
  border-radius: 50%;
  transition: transform 0.3s ease;
  /* 添加过渡效果 */
}

.clock-text {
  position: relative;
  top: 50%;
  transform: translateY(-60%);
  text-align: center;
  color: white;
}

.clock-title {
  font-size: 18px;
}

.clock-time {
  margin-top: 7px;
  font-size: 30px;
}

.calendar-day {
  text-align: center;
  color: #202535;
  // line-height: 30px;
  line-height: 70px;
  font-size: 12px;
}
.succes {
  // border-radius: 50%;
  background-color: #6ed411;
  font-size: 10px;
}
.padding {
  // border-radius: 50%;
  background-color: #6ad7f8;
  font-size: 10px;
}

::v-deep .el-calendar-table__row .prev .calendar-day,
.el-calendar-table__row .next .calendar-day {
  color: #c4c4cc !important;
  background-color: #fff;
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  ::v-deep .el-calendar-table .el-calendar-day {
    height: 45px;
  }
  .padding {
    border-radius: 50%;
  }
  .succes {
    border-radius: 50%;
  }
  .calendar-day {
    line-height: 30px;
  }
}
</style>
