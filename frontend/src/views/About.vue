<template>
  <div>
    <br />
    <div align="middle">
      <a-card style="width:300px">
        <p>Proxima Feira</p>
        <p>Data: 09/09/2018</p>
      </a-card>
    </div>
    <div :style="{ marginTop: '16px' }">
      <a-radio-group defaultValue="c" buttonStyle="solid">
        <a-radio-button value="a">Manhã</a-radio-button>
        <a-radio-button value="b">Tarde</a-radio-button>
        <a-radio-button value="c">Integral</a-radio-button>
      </a-radio-group>
    </div>
    <br />
    <div align="middle">
      <a-card title="Avisos" style="width:300px" >
        <p>Vai chove!</p>
      </a-card>
    </div>
  </div>
</template>
