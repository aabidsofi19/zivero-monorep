<template>
  <div class="px-1">
    <p class="text-h6 text-uppercase font-weight-bold my-2">
      {{ label }}
    </p>

    <v-list-item-group v-model="input" :multiple="multiple">
      <template v-for="(item, i) in filterValues">
        <v-list-item
          :key="i"
          class="list-item"
          :value="getValue(item)"
          active-class="white"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="deep-purple accent-4"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content class="content">
              <v-list-item-title class="title-wrap">
                <span class="title-wrap text-break">
                  {{ getTitle(item) }}
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["filterType", "label", "filterValues", "multiple"],
  data() {
    return {};
  },
  computed: {
    ...mapState("filters", ["filterInput"]),

    input: {
      get() {
        return this.filterInput[this.filterType];
      },
      set(v) {
        this.selectFilter({
          filterType: this.filterType,
          value: v,
          doUpdate: true,
        });
      },
    },
  },
  methods: {
    ...mapActions("filters", ["filterProducts", "selectFilter"]),
    getTitle(item) {
      //return the the name if the item is an obj else the item
      if (typeof item == "object") {
        return item.name;
      } else {
        return item;
      }
    },
    getValue(item) {
      //return the the name if the item is an obj else the item
      //
      if (typeof item == "object") {
        return item.id;
      } else {
        return item;
      }
    },
  },
};
</script>
<style scoped>
.title-wrap {
  /* word-wrap: break-word !important;
  text-overflow: ellipsis !important; */
  overflow-wrap: break-word;
}

.list-item {
  height: 10px !important;
  /* background-color: aqua; */

  padding-block: 0px !important;
  margin: 0px !important;
  font-size: 10px !important;
}

.v-list-item--active::before {
  opacity: 0;
  padding: 0;
  margin: 0;
}

.content {
  /* height: 10px !important; */
  /* background-color: blue; */
  padding: 0px !important;
  padding-block: 0px !important;
  margin: 0px !important;
  font-size: 10px !important;
}
</style>
