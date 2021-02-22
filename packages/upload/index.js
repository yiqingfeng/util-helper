import MyComponent from './src';

/* istanbul ignore next */
MyComponent.install = function (Vue) {
  Vue.component(MyComponent.name, MyComponent);
};

export default MyComponent;
