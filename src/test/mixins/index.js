export default {
  data(){
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created: function () {
    this.hello()
    console.log('混入对象的钩子被调用')
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    },
    fooMethod: function () {
      console.log('mixin foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}
