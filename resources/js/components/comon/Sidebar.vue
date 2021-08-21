<template>
  <div>
    <v-navigation-drawer
      app
      clipped
      v-model="DRAWER_STATE"
      :mini-variant="!DRAWER_STATE"
      :width="sidebarWidth"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      :mini-variant-width="sidebarMinWidth"
      :class="{ 'drawer-mini': !DRAWER_STATE }"
      color="primary"
      dark
    >
      <v-list>
        <template v-for="(item, i) in staticmenu">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6" class="py-5">
              <span
                style="padding-left: 32px"
                class="text-body-1 subheader white--text"
                :class="item.heading && DRAWER_STATE ? 'show ' : 'hide'"
              >
                {{ item.heading }}
              </span>
            </v-col>
            <v-col cols="6" class="text-center"> </v-col>
          </v-row>
          <v-divider
            light
            v-else-if="item.divider"
            :key="i"
            class="my-4 white"
          ></v-divider>
          <v-list-group
            color="primary"
            v-else-if="item.children && DRAWER_STATE"
            :key="item.title"
            v-model="item.model"
          >
            <template v-slot:prependIcon>
              <v-icon size="15" color="white">mdi-image-filter-none</v-icon>
            </template>
            <template v-slot:activator>
              <v-list-item-content size="15">
                <v-list-item-title class="white--text">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              link
              exact
              hover
            >
              <v-list-item-content>
                <v-list-item-title class="white--text">
                  {{ child.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            color="primary"
            v-else
            :key="item.text"
            :to="item.link === '#' ? null : item.link"
            exact
            link
            hover
          >
            <v-list-item-action>
              <v-icon size="15" color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" link>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-btn
      color="grey"
      dark
      fixed
      bottom
      right
      fab
      @click="$vuetify.goTo(0, 0)"
    >
      <v-icon>fas fa-angle-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      staticmenu: [{ title: "Dashboard", icon: "mdi-home", link: "/" }],
      sidebarWidth: 350,
      sidebarMinWidth: 100,
    };
  },
  computed: {
    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
  },
};
</script>

<style src="../../styles/Sidebar.scss" lang="scss"/>
