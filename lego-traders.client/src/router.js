import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard, authSettled } from "@bcwdev/auth0provider-client";

function loadPage(page) {
  return () => import(`./pages/${page}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadPage("HomePage"),
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    component: loadPage("MarketplacePage"),
    beforeEnter: authGuard
  },
  {
    path: "/account",
    name: "Account",
    component: loadPage("AccountPage"),
    beforeEnter: authGuard,
  },
  {
    path: "/collection",
    name: "Collection",
    component: loadPage("CollectionPage"),
  },
  {
    path: "/collection/:set_num",
    name: "SetDetails",
    component: loadPage("SetDetailsPage"),
  },
  {
    path: "/forum",
    name: "Forum",
    component: loadPage("ForumPage"),
  },
  {
    path: "/profile/:profileId",
    name: "Profile",
    component: loadPage("ProfilePage"),
  },
  {
    path: "/createyourown",
    name: "MOC",
    component: loadPage("MOCPage"),
  },
  {
    path: "/createyourown/:mocId",
    name: "MOCSteps",
    component: loadPage("MOCStepsPage"),
  },
  {
    path: "/forum/:postId",
    name: "ForumPost",
    component: loadPage("ForumPostPage"),
  },
];

export const router = createRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  history: createWebHashHistory(),
  routes,
});
