<template>
  <div>
    <p class="text-h6 text-uppercase font-weight-bold my-2">{{ label }}</p>

    <v-list-item-group v-model="input" :multiple="multiple">
      <template v-for="(item, i) in filterValues">
        <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

        <v-list-item
          v-else
          :key="`item-${i}`"
          :value="getValue(item)"
          active-class="deep-purple--text text--accent-4"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="deep-purple accent-4"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="getTitle(item)"></v-list-item-title>
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
    ...mapState("filters", ["variantFilterInput"]),

    input: {
      get() {
        return this.variantFilterInput[this.filterType];
      },
      set(v) {
        this.selectVariantFilter({
          filterType: this.filterType,
          value: v,
          doUpdate: false,
        });
      },
    },
  },
  methods: {
    ...mapActions("filters", ["filterProducts", "selectVariantFilter"]),
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
      // //console.log(typeof item== "object")
      if (typeof item == "object") {
        return item.id;
      } else {
        return item;
      }
    },
  },
};
</script>
