<template>
  <div class="login-container">
    <h2 class="title">登录</h2>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
      <a-form-item :validate-status="emailError() ? 'error' : ''"
                   :help="emailError() || ''"
                   label="邮箱"
      >
        <a-input
            v-decorator="[
            'email',
            { rules: [{ required: true, message: '请输入你的邮箱!' },
            {pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不合法!'}
            ] },
          ]"
            placeholder="email"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''"
                   :help="passwordError() || ''"
                   label="密码"
      >
        <a-input
            v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入你的密码!' }] },
          ]"
            type="password"
            placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>

      <div class="checked-box">
        <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
        >
          Remember me
        </a-checkbox>

      </div>


      <a-form-item class="log-btn">
        <a-button type="primary" html-type="submit" class="log-btn" :disabled="hasErrors(form.getFieldsError())">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, {name: 'horizontal_login'}),
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    emailError() {
      const {getFieldError, isFieldTouched} = this.form
      return isFieldTouched('email') && getFieldError('email')
    },
    // Only show error after a field is touched.
    passwordError() {
      const {getFieldError, isFieldTouched} = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('userLogin', values).then(
              res=> {
                console.log(this.$store.state.user)
                res && this.$router.push({name: 'index'})
              }
          )
          console.log('Received values of form: ', values)
        }
      })
    },
  },

}
</script>
<style scoped>
.login-container {
  width: 500px;
  margin: 100px auto;

}

.log-btn {
  margin-left: 75px;
  text-align: center;
}

.title {
  text-align: center;
}

.checked-box {
  margin-top: -10px;
  margin-left: 60px;
}
</style>
