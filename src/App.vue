<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="col text-center">
            <h1 class="mt-3">Model Creator</h1>
            <p>Create TypeScript model (getter, setter)</p>
          </div>
          <div class="mb-3">
            <label for="className" class="form-label">Class</label>
            <input
              type="text"
              class="form-control"
              id="className"
              v-model="className"
              required
            />
          </div>
          <div class="mb-3">
            <label for="classProperties" class="form-label">Properties</label>
            <textarea
              class="form-control"
              id="classProperties"
              rows="8"
              v-model="classProperties"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <button
              id="btnCreateModel"
              type="submit"
              class="btn btn-success w-100"
              @click="createModel"
            >
              Create
            </button>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label"
              >Output</label
            >
            <input
              type="text"
              class="form-control readonly"
              readonly
              id="exampleFormControlInput2"
              v-model="output"
            />
          </div>
        </div>
        <div class="col-6">
          <h3 class="mt-3">Help</h3>
          <hr />
          <ul>
            <li>Fill class name</li>
            <li>
              Fill property name any type like this
              <code>name:string, name: string</code>
            </li>
            <li>
              Click Create
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as transform from "./functions/transform";
import * as parser from "./functions/parser";

@Component({
  components: {}
})
export default class App extends Vue {
  className = "";
  classProperties = "";
  output = "";

  createModel() {
    const className = this.className;
    const classProps = this.classProperties;

    if (className !== "" && classProps !== "") {
      const input: {
        name: string;
        properties: Array<{ name: string; type: string }>;
      } = {
        name: transform.toClassName(className),
        properties: transform.toClassProperties(classProps)
      };
      this.output = parser.toStandardModel(input);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
