# What is this?

MONO-REPO for building each part of this dnd microservice shenanigans. Thought it would be a fun little project to try and get used to a monorepo setup. 

The Goal: Inventory drop pools which can be split/claimed by players. The drop pools will note whats left after each claim. GM's will register a party, and then fill out what all the drops are into a list. The list will get sent to discord and people can click to claim individual items, while the money will be split among them

As the numbers will be varied, emotes, while a good idea, might have to be put to the side in favour of the classic ` $claim [number] ` format.

# The Steps?

Scenario: People have killed a bunch of monsters. There's a large loot list of things, and people need an easy way to tick off or claim items from the 15/20 items and to split the currency evenly.

What to do: The DM goes and as he rolls/decides fills out an item line for each reward in the party loot list. Once submitted, it will appear in discord in a channel of your choice. From there, players just claim the loot they want in the channel, with the message being editted/updated to display the updated contents as it goes. 

### The Gateway

Where all api requests will go. Authorization will be done via [Auth0](https://auth0.com/)

### The API

Where all requests, once confirmed to be okay by the gateway, are processed

- the API will contain this simple data model

- Users can have many parties

- Parties can have many members

- Parties can have many Drop Pools.

- Drop Pools have many Items

### The Web

A simple frontend interface for users to interact with their parties and loot pools. Basically a GM thing. They can make or break parties loot and items as they see fit. Each loot pool can be sent when ready to discord via a webhook url. 

### The Discord Bot

A simple bot to interact with the API above. Discord account will have to be linked with the API somehow.