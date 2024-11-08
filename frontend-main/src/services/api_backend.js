// This is our file for our backend calls.
import * as React from "react";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';


const url = "https://api-ovtmrhypiq-ew.a.run.app";

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export function getUserById(userId) {
  let data = fetch(url + "/user/" + userId)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return data;
}

export function getActivityById(activityID) {
  let data = fetch(url + "/activity/" + activityID)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return data;
}

export function getActivityGenderById(activityID) {
  let data = fetch(url + "/activitygender/" + activityID)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return data;
}

export function getActivityInterestById(activityID) {
  let data = fetch(url + "/activityinterests/" + activityID)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return data;
}

export function addUserInterest(userID, interest) {
  let data = fetch(url + "/adduserinterest", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserId: userID.toString(),
      Interests: interest,
    }),
  });
  return data;
}

export function addActivityInterest(activityID, interest) {
  let data = fetch(url + "/addactivityinterest", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Activityid: activityID.toString(),
      Interests: interest,
    }),
  });
  return data;
}

export function addActivityGender(activityID, gender) {
  let data = fetch(url + "/addactivitygender", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Activityid: activityID.toString(),
      Gender: gender,
    }),
  });
  return data;
}

export function userLogin(user) {
  let data = fetch(url + "/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: user,
  });
  return data;
}

export async function createUser(user) {
  let response = await fetch(url + "/createUser", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: user,
  });
  return response;
}

export async function createEvent(event) {
  let response = await fetch(url + "/addactivity", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: event,
  });
  return response;
}

export async function addMatchedUser(matchedUser) {
  let response = await fetch(url + "/matchuser", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: matchedUser,
  });
  return response;
}

export async function authenticateJWT(JWT) {
  let response = await fetch(url + "/verifyJWT", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${JWT}`,
    },
    body: JWT,
  }).then(result => {
    if (result.ok) {
      return true
    } else {
      return false
    }
  });
  return response;
}
