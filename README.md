# targetedAdsBackend

Backend Watson API for Visual Recognition

# Problem statement:
Create dynamic ads to adapt to the audience's interests. Potential deployment would be in NYC subways.
The mission here with Smart Ads IRL is to bridge the gap between audiences and companies looking to advertise to their specified audience. Companies worldwide use ads to target consumers with the intention that their goods or services will be purchased. With the exception of interne, after hundreds of years of public facing ads, not much has changed in how we deploy them to the public. Today, static ads are placed on billboard outlets, but the chances of the right person seeing them are all up to chance. Our solution is to create a dynamically changing ad system on the same ad space. Companies may purchase ad space on some electronic billboard, and using Watson Visual Recognition Services, the public facing technology will be able to detect what kind of person is approaching the ad space to be viewed, analyze them, and thus show them the best kind of ad that suits their appearance. Using the Watson Visual Recognition Service, we can analyze a person's clothes, accessories, and other extensions to have a perfectly tailored ad to them and increase the chances of fostering a purchase for a company that owns that ad space.

# Solution:
Camera looks at audience inspecting for clothing features (logos and cloth type), accessories, and other non-compromising features to display personalized ads on a monitor.

Explain file distribution (e.g. 2 github repos, etc)

# MVP Developed
We used a Raspberry Pi microprocessor hooked to a camera and monitor that calls sends a camera picture to a server that responds with an ad. In the server we are running the picture through Watson Visual Recognition to detect features and use these features to recommend an ad.
Implementation Details
Server
Node.JS server acting as API with a single endpoint. This endpoint receives an image sent by the client and leverages the Watson Visual Recognition service to detect features. These features and then fed to a simple recommendation system to send back the personalized ad. We deployed this application on Bluemix using Cloud Foundry.

Raspberry Pi (Model 3B) uses monitor and camera. This is used to simulate a IOT device in the real world that controls some ad space. The camera hooked up to this outlet will take a picture of a person walking by, and the Raspberry Pi will send a request to the backend API setup that uses the Watson Visual Recognition services. The API will then return the best ad to the Raspberry Pi and then display that ad to the user.

Recommendation System: We decided to use a modular approach to the recommendation system so that the end user could plug their own design into our system. Currently, we're using a probabilistic system to showcase ads which appeal to a balance of demographics seen. For instance, if Watson sees both someone with a pet and with a suit, half of the time (broken into at minimum 3-second intervals) Watson will show an ad targeting the person in the suit, half of the time following the person with the pet. This allows for a better handling of crowd advertisements, where many different demographics could exist.

# Deploying Solution
Requirements:
•	Raspberry Pi microprocessor
•	Camera
•	Bluemix account
Steps
•	Clone repos
•	Deploy server to Bluemix
•	Load code to Raspberry Pi
