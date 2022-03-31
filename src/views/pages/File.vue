<template lang="">
  <div>
    <b-button @click="$refs.file.click()">Choose File</b-button>
    <input ref="file" type="file" @change="fileChange" hidden />

    <b-button @click="answerSQl">Gen question sql </b-button>
  </div>
</template>
<script>
import { BButton } from 'bootstrap-vue'
import readXlsxFile from 'read-excel-file'
import questionData from './package'
import {Client} from "@twilio/conversations"
export default {
  components: {
    BButton,
  },
  methods: {
   async  twilio(){
      let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJpc3MiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3IiwiZXhwIjoxNjQ4MzA4Njg4LCJqdGkiOiJTSzBjYzRiNDUwNDFmZDUyMzQ3MmNiOGY3MDViNzA2MGM3LTE2NDgzMDUwODgiLCJzdWIiOiJBQzVlNGRkY2FmMjkwMmU1ZjU4YzMzODZjZGEwYTZjMDg1IiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiTlRBX2ZlNzQ2MmUzLTVjYzEtNGI4Zi1hYTI3LWE2MjI4OGJlMjg3MSIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzAxOWQ0Y2VhMTAxNDRjZGJhZmE3ZDhhMTQ4NGJkMzRlIn19fQ.HZZ0CZgPLe7OoGvCOa0TjqeP5hw5qczUFKuMyZHymoQ"
      let client=new Client(token)
      let conversation=await client.getConversationBySid("CH32bfc03b70444fd09ee591d50ff098e0")
      debugger
      console.log(conversation);
   },
    fileChange(event) {
      const data = []
      readXlsxFile(event.target.files[0]).then((rows) => {
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i]
          let group = data.find((x) => x.groupName === row[0])

          if (!group) {
            group = {
              groupName: row[0],
              data: {},
            }
            data.push(group)
          }
          const key = this.toCamelCase(row[1])
          group.data[key] = row[2]
        }
        console.log(JSON.stringify(data))
        const newWindow = window.open('')
        newWindow.document.write(`<p>${JSON.stringify(data)}</p>`)
      })
    },
    toCamelCase(key) {
      if (!key.length) return key
      let strs = key.split('_')
      strs[0] = strs[0].charAt(0).toLowerCase() + strs[0].slice(1)
      if (strs.length > 1)
        for (let i = 1; i < strs.length; i++) {
          let element = strs[i]
          strs[i] = element.charAt(0).toUpperCase() + element.slice(1)
        }
      return strs.join('')
    },
    questionSQl() {
      let data = ""
      questionData.forEach((element) => {
        if(element.text.length<50)
        data += `INSERT INTO sai_system.questions(title,label) VALUES ('${element.text}','${element.text}');`+'\r\n'
      })
      console.log(data);
    },
    answerSQl() {
    let data = ""
    //   let start=32
    //   let count=0
    //   questionData.forEach((element) => {
    //     if(element.text.length<50)
    //    {
    //       data += `INSERT INTO sai_system.answers(question_id,text, config) VALUES ('${start+count}','${element.value}','{}');`+'\r\n'
    //     count++
    //    }
    //  })
    //   console.log(data);
    for (let index = 2; index < 20; index++) {
      data+=`INSERT INTO sai_demo.product_categories (category_id, product_id,display_order) VALUES ('${index}', '2',1);\r\n`
    }
    // for (let index = 1; index < 70; index++) {
    //   if(index<10||index>32)
    //   data+=`INSERT INTO sai_demo.product_questions (question_id, product_id,display_order) VALUES ('${index}', '2',1);\r\n`
    // }

    // for (let index = 1; index < 70; index++) {
    //   if(index<10||index>32)
    //   data+=`INSERT INTO sai_demo.question_roles (question_id,role_id) VALUES ('${index}','1');\r\n`   
    //  }
    console.log(data);
    },

    updateCategoryQuestion(){
      let data=''
      //const categories =[9,10,11,14,15,17,18]
      for (let i = 32; i < 70; i++) {
        
     //   let value=categories[Math.floor(Math.random() * categories.length)]
       data+=`INSERT INTO sai_demo.question_roles (question_id,role_id) VALUES ('${i}','1');\r\n`

      }
    
     console.log(data);
    }
  },
}
</script>
<style lang=""></style>
