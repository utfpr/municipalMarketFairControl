<template>
  <a-layout>
    <a-layout-header style="padding: 0 0">
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item class="menus" key="1" v-on:click="mudar(1)">Confirmar</a-menu-item>
        <a-menu-item class="menus" key="2" v-on:click="mudar(2)">Faturamento</a-menu-item>
        <a-menu-item class="menus" key="3" v-on:click="mudar(3)">Perfil</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 0">
  
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
      <template v-if="pg == 1">
        <div class="home">
          <div class="cabStep">
            <p>{{ dia }}</p>
          </div>
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
    <div class="cald">
      <div class="cald-up">
        <p>Avisos</p>
      </div>
      <div class="">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus eu quam vel nisi molestie blandit. Fusce facilisis, purus ac malesuada vestibulum,
          neque magna porttitor felis, tincidunt cursus ligula leo in tellus.
          Maecenas a rutrum arcu,
          non consequat nisi. Vestibulum in dui mauris. Curabitur id dictum dolor.
          Nulla sagittis nec mi sed tincidunt. Phasellus egestas augue diam,
          et dapibus libero pulvinar a. Vestibulum
          blandit ante libero, ut ultricies lorem congue mattis. Aenean molestie nisl et tincidunt
          molestie.!</p>
      </div>
    </div>
    <div class="steps-action">
      <template v-if="current == 0">
        <template v-if="btnAct == 0">
      <a-button
        type = 'danger'
        disabled = true
        :size="size"
        block
      >
        CONFIRMAR PRESENÇA
      </a-button>
      <p style="text-align: center">PERIODO DE CONFIRMAÇÃO EXPIRADO</p>
      </template>
       <template v-else>
         <a-button
        type = 'primary'
        :size="size"
        block
        @click="next"
      >
        CONFIRMAR PRESENÇA
        </a-button>
       </template>
      </template>
      <a-button
        :size="size"
        v-if="current == 2"
        type="primary"
        block
        @click="next"
      >
        INFORMAR FATURAMENTO
      </a-button>
      <a-button
        :size="size"
        v-if="current == 2"
        type="danger"
        block
        @click="showModal1"
      >
        CANCELAR PRESENÇA
      </a-button>
      <a-radio-group v-if="current == 1" defaultValue="c" buttonStyle="solid" size="large">
        <a-radio-button @click="showModal2a" value="a">Manhã: 8:00 - 13:00</a-radio-button>
        <a-radio-button @click="showModal2b" value="b">Tarde: 13:00 - 18:00</a-radio-button>
        <a-radio-button @click="showModal2c" value="c">Integral: 8:00 - 18:00</a-radio-button>
      </a-radio-group>


        
    </div>
    <a-modal
      title="Cancelar presença na FEIRA ?"
      v-model="visible1"
      @ok="handleOk1"
      okText="Confirmar"
      okType= "danger"
      cancelText="Cancelar"
    >
      <p>Você deseja realmente cancelar sua participação na FEIRA do dia: {{ dia }}</p>
    </a-modal>

  


    <a-modal
      title="Confirmar presença na FEIRA ?"
      v-model="visible2"
      @ok="handleOk2"
      okText="Confirmar"
      okType= "success"
      cancelText="Cancelar"
    >
      <p v-if="valor == 0">{{ dia }}, você deseja confirmar sua participação, no perido da Manhã: 8:00 - 13:00 ?
      </p>
      <p v-if="valor == 1">{{ dia }}, você deseja confirmar sua participação, no perido da Manhã: 13:00 - 18:00 ?
      </p>
      <p v-if="valor == 2">{{ dia }}, você deseja confirmar sua participação, no perido da Manhã: 8:00 - 18:00 ?
      </p>
    </a-modal>

  </div>
      </template>
 
  <template v-if="pg == 2">
    <template v-if="participou ==1">
      <template v-if="informado == 0">
    <div class="cabStep">
            <p>Informar faturamento do dia {{ dmgAnterior }}</p>
          </div>
    <div>
          <div class="renda">
          <span class="label-renda">ESCREVA SEU FATURAMENTO</span>
          <a-input-number :min="1" v-model="value" @change="onChange" :precision="2" size="large" class="input-renda" ref="renda"/>
          </div>
            <a-button
              :size="size"
              type="submit"
              block
              @click.prevent="handleFaturamento"
      >
        INFORMAR FATURAMENTO
      </a-button>
        </div>
    </template>


    <template v-if="informado ==1">
      <h1>Você já informou seu faturamento</h1>
  </template>
  </template>
    <template v-if="participou == 0">
        <h1>Você não partipou da feira anterior</h1>
    </template>
        <a-modal
      title="Informar Faturamento"
      v-model="visible3"
      @ok="handleOk3"
      okText="Confirmar"
      okType= "sucess"
      cancelText="Cancelar"
    >
      <p>O valor {{ fat }} está correto?</p>
    </a-modal>

  </template>

 </div>



    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>









<script>
import getParticipa from '@/api/participa';
import getDate from '@/api/date';
let moment = require('moment');
//require('moment-recur');
export default {
  data() {
    return {
      informado: 0,
      dmgAnterior: '',
      participou: 0,
      pg: 1,
      collapsed: false,
      value: 0,
      btnAct: 1,
      size: 'large',
      current: 0,
      valor: 2,
      fat: 0,
      visible1: false,
      visible2: false,
      visible3: false,
      dia: '',
      steps: [
        {
        title: 'CONFIRMAR',
      },
      {
        title: 'PERIODO',
      },
      {
        title: 'CANCELAR',
      }],
    };
  },
  async created(){
    let id =localStorage.getItem('userID');
    //let cal = moment.recur().every(7).daysOfWeek();
    let k = await getDate();
    let n =  moment(k.serverData);
    let domingoAnterior = n.clone();
    domingoAnterior.weekday(0);
    console.log(domingoAnterior.format("DD-MM-DD"));
    this.dmgAnterior = domingoAnterior.format("DD/MM/YYYY");


    let part = await getParticipa(domingoAnterior.format("YYYY-MM-DD"));
    let p;
    for (p in part.participaram){
      if(part.participaram[p].cpf == id){
        this.participou = 1;  
        console.log(part.participaram[p]);
      }
    }
    console.log(part);

    if(n.weekday() >= 5 ){
      this.btnAct = 0
    }
    if(n.weekday() == 0){
      this.dia = "A feira é hoje!";
      this.btnAct = 0
    }
    else{
      let prox = moment().weekday(7);
      this.dia = `A proxima feira será dia - ${prox.format("DD/MM/YYYY")}`;
    }
    //this.dia = n.format('DD/MM/YYYY');
    },
  methods: {
    next() {
      this.current++;
    },
    showModal1() {
      this.visible1 = true;
    },
    handleOk1(e) {
      console.log(e);
      this.current = 0;
      this.visible1 = false;
      this.$message.success('Presença Cancelada com Sucesso!');
    },
    handleCancel1(e) {
      console.log(e);
      this.visible1 = false;
    },
    showModal2a() {
      this.visible2 = true;
      this.valor = 0;
    },
    showModal2b() {
      this.visible2 = true;
      this.valor = 1;
    },
    showModal2c() {
      this.visible2 = true;
      this.valor = 2;
    },
    handleOk2(e) {
      console.log(e);
      this.current++;
      this.visible2 = false;
      this.$message.success('Presença Confirmada com Sucesso!');
    },
    handleCancel2(e) {
      console.log(e);
      this.visible2 = false;
    },
    onChange(value) {
        console.log('changed', value);
      },
    mudar(vl){
      console.log(vl);
      this.pg= vl;
    },
    handleFaturamento(){
      this.fat = (this.$refs.renda.value);
      this.visible3 = true;
      console.log(fat);
    },
    handleOk3(){
       this.$message.success('Renda informada com sucesso!');
       this.informado = 1;
       this.visible3 = false;
    }
  },
  // handleSubmit(e) {
  //   e.preventDefault();
  //   axios.get('', {
  //     data, status
  //   }).then(res => {
  //     $notification['success']({
  //       message: 'Bem Vindo! ',
  //       description: 'Login efetuado com sucesso!',
  //     });
  //   }).catch(ex => {
  //     $notification['error']({
  //       message: 'Erro',
  //       description: 'Erro: ' + ex,
  //     });
  //   });
  // },
};
</script>
<style scoped>
  .home {
    margin-top: 20px;
    widows: 100%;
  }
  .cabStep {
    margin-bottom: 35px;
    margin-top: 25px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 140px;
    text-align: center;
    padding-top: 40px;
    font-size: 35px;
    width: 100%;
  }
  .ant-steps-item-title {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    padding-right: 16px;
    position: relative;
    line-height: 32px;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
    font-size: 20px;
  }
  .ant-btn-primary {
    color: #fff;
    background-color: #52c41a;
    border-color: #52c41a;
    margin-bottom: 30px;
  }
  .ant-btn-danger {
    color: #f5222d;
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    margin-bottom: 30px;
}
  .steps-action {
    margin-top: 24px;
  }
  .ant-radio-group{
    margin-bottom: 15px;
  }
  .ant-radio-group-large .ant-radio-button-wrapper {
    height: 40px;
    line-height: 38px;
    font-size: 16px;
    width: 423px;
    text-align: center;
    margin-bottom: 10px;
  }
  .cald {
    margin-bottom: 15px;
    margin-top: 35px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 140px;
    text-align: center;
    padding-top: 30px;
    font-size: 20px;
    width: 100%;
  }
  .cald-up {
    border-bottom: 2px dashed #e9e9e9;
  }
  .cald-down {
    text-align: justify;
    padding-top: 15px;
    padding-left: 40px;
    padding-right: 30px;
    font-size: 14px;
  }
  .renda{
    text-align: center;
    margin-bottom: 10px;
    padding: 10px;
  }
.label-renda{
  font-size: 14px;
  margin-right: 7px;
}
.menus{
  padding-right: 5%;
}






  @media only screen and (max-device-width: 480px) {
  .ant-steps-horizontal.ant-steps-label-horizontal {
    padding-left: 50px;
    display: block;
  }
  /* .ant-steps-item.ant-steps-item-process, .ant-steps-item.ant-steps-item-wait {
    padding-bottom: 28px;
  } */
  .cald {
    margin-top: 15px;
  }
  .ant-radio-group-large .ant-radio-button-wrapper {
    height: 40px;
    width: 100%;
  }
  .menus{
    width: 33%;
  }
  }
  @media only screen and (min-device-width: 480px) {
    .ant-radio-group-large .ant-radio-button-wrapper {
      height: 40px;
      width: 100%;
    }
  }
  @media only screen and (min-device-width: 607px) {
    .ant-radio-group-large {
      width: 100%;
    }
  }
</style>
