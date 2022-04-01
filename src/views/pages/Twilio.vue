<template lang="">
  <div class="container">
    <div class="client-1">
      <b-button variant="info" @click="createUser1">Connect</b-button>
      <b-form-textarea v-model="content1" />
      <b-button @click="sendM1">Send</b-button>
    </div>
    <div class="client-2">
      <b-button variant="info" @click="createUser2">Connect</b-button>
    </div>
  </div>
</template>
<script>
import { Client } from "@twilio/conversations";
import { BButton, BFormTextarea } from "bootstrap-vue";
export default {
  components: {
    BButton,
    BFormTextarea,
  },

  data() {
    return {
      conversationId: "CHa2bc4a497e0f490ea395217591c51a78",
      content1: "",
      users: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3IiwiZXhwIjoxNjQ4ODExNDc4LCJqdGkiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3LTE2NDg4MDc4NzgiLCJzdWIiOiJBQzVlNGRkY2FmMjkwMmU1ZjU4YzMzODZjZGEwYTZjMDg1IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiTlRBX2ZlNzQ2MmUzLTVjYzEtNGI4Zi1hYTI3LWE2MjI4OGJlMjg3MSIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzAxOWQ0Y2VhMTAxNDRjZGJhZmE3ZDhhMTQ4NGJkMzRlIn19fQ.3OeNFAhaGa09mDNR0ovuAQTAHVr1JD6ifE5rzTNuZy4",
       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3IiwiZXhwIjoxNjQ4ODExNDU1LCJqdGkiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3LTE2NDg4MDc4NTUiLCJzdWIiOiJBQzVlNGRkY2FmMjkwMmU1ZjU4YzMzODZjZGEwYTZjMDg1IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiTlRBXzg4ZDA4ODc0LWNmZjUtNDU3Mi04YWY5LWEzMzE1NzNmYTYwMSIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzAxOWQ0Y2VhMTAxNDRjZGJhZmE3ZDhhMTQ4NGJkMzRlIn19fQ.EHfrD-u5rNQV_80ApsGnqz78MFTfo0gN9beURiSPT6I"],
      conversation1: null,
      conversation2: null,
    };
  },
  created() {},

  methods: {
    async createUser1() {
      Client.create(this.users[0]).then(async (client) => {
        debugger
        try {
          let conversation = await client.getConversationBySid(
            this.conversationId
          );
          this.conversation1 = conversation;
          
          client.on("userUpdated", (message) => {
            console.log(message);
            debugger
            //  this.$bvToast.toast(message.co,{autoHideDelay:3000})
          });

          client.on("conversationJoined",(message)=>{
            console.log(message);
            debugger
          })
          conversation.join()


          //   let participants = await conversation.getParticipants()
          //   let message=await conversation.getMessages(100,29, 'backwards')
          //   console.log(message);
          //  console.log(participants);
          this.$bvToast.toast("Conected success", {
            title: `Thông báo`,
            variant: "success",
            solid: true,
            autoHideDelay:4000,
             appendToast: true
          });
        } catch (err) {
          debugger;
          console.log(err);
          this.$bvToast.toast("err", { autoHideDelay: 3000 });
        }
      });
    },

    async createUser2() {
      Client.create(this.users[1]).then(async (client) => {
        try {
          let conversation = await client.getConversationBySid(
            this.conversationId
          );
          this.conversation2 = conversation;
          conversation.join()
          conversation.on("participantUpdated", (message) => {
            console.log(message);
            debugger
            //  this.$bvToast.toast(message.co,{autoHideDelay:3000})
          });
          conversation.on("messageAdded", (message) => {
            console.log(message);
            debugger
            //  this.$bvToast.toast(message.co,{autoHideDelay:3000})
          });

          //   let participants = await conversation.getParticipants()
          //   let message=await conversation.getMessages(100,29, 'backwards')
          //   console.log(message);
          //  console.log(participants);
          this.$bvToast.toast("Conected success", {
            title: `Thông báo`,
            variant: "success",
            solid: true,
              autoHideDelay:4000,
              appendToast: true
          });
        } catch (err) {
          debugger;
          console.log(err);
          this.$bvToast.toast("err", { autoHideDelay: 3000 });
        }
      });
    },

    async sendM1() {
      try {
        console.log(this.content1);
        let result = await this.conversation1.sendMessage(this.content1);
        console.log(result);
        this.content1 = "";
        this.$bvToast.toast("send OK", {
          autoHideDelay: 3000,
        });
      } catch (err) {
        console.log(err);
        //debugger
      }
    },
  },
};
</script>
<style lang="scss">
.container {
  display: flex;
  .client-1 {
    width: 50%;
  }
  .client-2 {
    width: 50%;
  }
}
</style>
