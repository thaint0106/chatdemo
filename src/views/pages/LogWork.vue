<template lang="">
  <div>
    <div>Log Work</div>
    <b-row>
      <label>Token</label>
      <b-form-textarea v-model="token" />
    </b-row>
    <b-row class="mt-1">
      <b-col md="4">
        <label>Start time</label>
        <b-form-datepicker
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          v-model="startDate"
        />
      </b-col>
      <b-col md="4">
        <label>End time</label>
        <b-form-datepicker
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          v-model="endDate"
        />
      </b-col>
      <b-col md="4">
        <label>remark</label>
        <b-form-input v-model="remark" />
      </b-col>
    </b-row>
    <b-row class="btn-content mt-1">
      <b-button variant="primary" @click="submit" class="btn">Submit</b-button>
    </b-row>
  </div>
</template>
<script>
import {
  BFormDatepicker,
  BRow,
  BCol,
  BFormTextarea,
  BFormInput,
  BButton,
} from "bootstrap-vue";
import axios from "axios";
export default {
  components: {
    BFormDatepicker,
    BFormTextarea,
    BRow,
    BCol,
    BButton,
    BFormInput,
  },
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYWkubi50QHplbmtlbnBsYW5ldC12bi5jb20iLCJuYW1laWQiOiIxOTMiLCJqdGkiOiIzZmJjMDkwMC01YmRhLTRjYWEtYTBiZS00ZjdkNzJlOWFhZjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNjQ2MTA1NTU0LCJpc3MiOiJodHRwOi8vb2VjLmNvbSIsImF1ZCI6Imh0dHA6Ly9vZWMuY29tIn0.x4rYXB53SVQyRztpHH6TGErIb2ZqGB51u0zzWsoGYH4",
      remark: "work",
      //       {
      //           employeeCd: 229
      // remarks: "work"
      // timeIn: "08:00"
      // timeOut: "17:00"
      // updateUserCd: 193
      // worktimeDate: "2022-02-07T00:00:00"
      //       }
    };
  },
  methods: {
    submit() {
      var dates = [];
      for (
        var d = new Date(this.startDate.toString());
        d <= new Date(this.endDate.toString());
        d.setDate(d.getDate() + 1)
      ) {
        const date = d.getDay();
        if (date > 0 && date < 6) dates.push(this.getdateFormat(d));
      }
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      Promise.all(
        dates.map((x) => {
          axios({
            method: "post",
            url: "http://35.220.199.113/api/Worktimes/UpdateTimeInOut",
            data: {
                employeeCd: 229,
                remarks: this.remark,
                timeIn: "08:00",
                timeOut: "17:00",
                updateUserCd: 193,
                worktimeDate: x,
            },
          });
        })
      );
    },
    getdateFormat(date) {
      return `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      }T00:00:00`;
    },
  },
};
</script>
<style lang="scss">
.btn-content {
  display: flex;
  .btn {
    width: 100px;
  }
}
</style>
