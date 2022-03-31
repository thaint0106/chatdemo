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
import { Client } from '@twilio/conversations'
import { BButton, BFormTextarea } from 'bootstrap-vue'
export default {
  components: {
    BButton,
    BFormTextarea,
  },

  data() {
    return {
      conversationId: 'CH227a1e42010c41b8bf4092d2f0c82365',
      content1: '',
      users: [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3IiwiZXhwIjoxNjQ4NzM5MjEwLCJqdGkiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3LTE2NDg3MzU2MTAiLCJzdWIiOiJBQzVlNGRkY2FmMjkwMmU1ZjU4YzMzODZjZGEwYTZjMDg1IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiTlRBX2ViNTUxNTU4LTBkNGEtNDk5ZC1hOTdiLTMyMTY4YzVhYmUxYyIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzAxOWQ0Y2VhMTAxNDRjZGJhZmE3ZDhhMTQ4NGJkMzRlIn19fQ.fxxPYp3pbYWxrvimsPnCoMDt2fBaGANOLLg2Lwhz8es',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3IiwiZXhwIjoxNjQ4NjYwMDg4LCJqdGkiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3LTE2NDg2NTY0ODgiLCJzdWIiOiJBQzVlNGRkY2FmMjkwMmU1ZjU4YzMzODZjZGEwYTZjMDg1IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiTlRBX2ZlNzQ2MmUzLTVjYzEtNGI4Zi1hYTI3LWE2MjI4OGJlMjg3MSIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzAxOWQ0Y2VhMTAxNDRjZGJhZmE3ZDhhMTQ4NGJkMzRlIn19fQ.lA3Aex3h0x9KolEkNNG4kxjNCWZqv0d43SEhKRxKTFg',
      ],
      conversation1: null,
      conversation2: null,
    }
  },
  created() {},

  methods: {
    async createUser1() {
      Client.create(this.users[0]).then(async (client) => {
        try{
          let conversation = await client.getConversationBySid(
          this.conversationId
        )
         this.conversation1 = conversation
         this.$bvToast.toast("connect OK",{autoHideDelay:3000})
        }
        catch(err){
          this.$bvToast.toast("err",{autoHideDelay:3000})
        }

        // let participants = await conversation.getParticipants()
        // if (participants) {
        //   let users = []
        //   for (let index = 0; index < participants.length; debugg++) {
        //     const element = participants[index]
        //     let user = await element.getUser()
        //     if (user.isOnline) {
        //       debugger
        //     }
        //     users.push(user)
        //   }
        // }

      })
    },

    async createUser2() {
      Client.create(this.users[1]).then(async (client) => {
        let conversation = await client.getConversationBySid(
          this.conversationId
        )
        let participants = await conversation.getParticipants()
        if (participants) {
          let users = []
          for (let index = 0; index < participants.length; index++) {
            const element = participants[index]
            let user = await element.getUser()
            // if (user.isOnline) {
            //   debugger
            // }
            users.push(user)
          }
        }
      })
    },

    async sendM1() {
      try{
      let result = await this.conversation1.sendMessage(this.content1)
      console.log(result)
      this.content1=""
       this.$bvToast.toast("send OK",{
         autoHideDelay:3000
       })
      }
      catch(err){
      console.log(err)
      //debugger
      }
    },
  },
}
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
