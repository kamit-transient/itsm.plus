<template>
  <DefaultLayout>
    <SectionHeaderBanner></SectionHeaderBanner>
    <section class="pt-5 mb-5">
      <b-container>
        <b-row>

          <b-col cols="3" class="sidebar">
            <h6>Filter by type</h6>

              <ul class="ml-3 list-unstyled">
                <li><g-link to="/resources">All</g-link></li>
                <li><g-link :to="filterUrl('type', 'site')">Site</g-link></li>
                <li><g-link :to="filterUrl('type', 'repository')">Repository</g-link></li>
              </ul>

            <h6>Filter by tag</h6>

            <ul class="ml-3 list-unstyled">
                <li v-for="tag in filterTags" :key="tag">
                  <g-link :to="filterUrl('tags', tag)">{{tag}}</g-link>
                </li>
              </ul>
          </b-col>

          <b-col cols="9">
            <CreditCard v-for="edge in $page.records.edges" :key="edge.node.id" :record="edge.node" />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <SectionContribute></SectionContribute>
  </DefaultLayout>
</template>

<script>
import CreditCard from "~/components/CreditCard.vue";
import SectionContribute from "~/layouts/sections/credits/Contribute.vue";
import SectionHeaderBanner from "~/layouts/sections/credits/HeaderBanner.vue";
import {each, uniq} from "lodash";

export default {
  components: {
    CreditCard,
    SectionContribute,
    SectionHeaderBanner
  },

  metaInfo: {
    title: "Resources"
  },

  methods: {
    filterUrl(type, value) {
      return `/resources/filter/${type}/${value}`;
    },
  },

  computed: {
    
    filterTags() {
      
      var tags = [];

      each(this.$page.resourceTags.edges, function(node) {
        each(node.node.tags, function(tag) {
          tags.push(tag.id);
        });
      }); 

      return uniq(tags);
    }
  }
};
</script>

<page-query>
  query {
    records: allResource(filter:{type:{eq:$type}}) {
      edges {
        node {
          title, 
          link,
          excerpt
        }
      }
    }

    resourceTags : allResource {
      edges {
        node {
          tags { id }
        }
      }
    }
  }
</page-query>