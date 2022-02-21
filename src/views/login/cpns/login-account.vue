<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { rules } from '../config/acount-config'
import { Elform } from 'element-plus'
import localCache from '@/utils/cache'
const store = useStore()

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const formRef = ref<InstanceType<typeof Elform>>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      //存密码
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style scoped></style>
