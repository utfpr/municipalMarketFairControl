<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed">
            <div class="logo" />
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
                <a-menu-item key="1">
                    <router-link to="/supervisor">
                        <a-icon type="shop" />
                        <span>
                            Feira
                        </span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="2" v-if="isAdmin">
                    <router-link to="/supervisor/supervisores">
                        <a-icon type="team" />
                        <span>
                            Supervisores
                        </span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link to="/supervisor/feirantes">
                        <a-icon type="contacts" />
                        <span>
                            Feirantes
                        </span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="4">
                    <router-link to="/supervisor/categorias">
                        <a-icon type="tags-o" />
                        <span>
                            Categorias
                        </span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="5">
                    <router-link to="/supervisor/mapeamento">
                        <a-icon type="appstore-o" />
                        <span>
                            Mapeamento
                        </span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="6">
                    <router-link to="/supervisor/aviso">
                        <a-icon type="message"> </a-icon>
                        <span>
                            Avisos
                        </span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="7">
                    <router-link to="/supervisor/relatorio">
                        <a-icon type="bar-chart"> </a-icon>
                        <span>
                            Relatorios
                        </span>
                    </router-link>
                </a-menu-item>
                
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-row type="flex" justify="space-between">
                    <a-col>
                        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
                    </a-col>
                    <a-col>
                        <a-popconfirm placement="bottomRight" title="Você será redirecionado para a tela de entrada, caso confirme a saída" @confirm="logOut" okText="Sair" cancelText="Cancelar">
                            <a-icon class="trigger" type="logout"/>
                        </a-popconfirm>
                    </a-col>
                </a-row>
            </a-layout-header>
            <a-layout-content :style="{  padding: '4px' }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>

</template>

<script>
export default {
    data() {
        return {
            collapsed: false
        }
    },

    computed: {
        isAdmin() {
            return localStorage.getItem('tag') === 'administrador';
        }
    },

    methods: {
        logOut () {
            localStorage.clear();
            this.$router.push('/');
        }
    }
}
</script>


<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#components-a-popconfirm-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>

