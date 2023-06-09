import axios from "axios";
export const KLAVIYO_TRACK_EVENT = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       "https://a.klaviyo.com/api/lists/QVz55A/relationships/profiles/",

  //       {
  //         headers: {
  //           accept: "application/json",
  //           revision: "2023-02-22",
  //           "content-type": "application/json",
  //           Authorization: "pk_5c81ddf31406397ed532f78a84575abacb",
  //         },
  //       },
  //       {
  //         event: "Event Name",
  //         customer_properties: {
  //           email: "johng@example.com",
  //         },
  //         properties: {
  //           property1: "value1",
  //           property2: "value2",
  //         },
  //       }
  //     );
  //     console.log(response.data); // Handle the response as needed
  //   } catch (error) {
  //     console.error(error);
  //   }

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };

    const response = await axios.post(
      "https://a.klaviyo.com/api/profiles/",
      {
        data: {
          type: "profile",
          attributes: {
            email: "sarah.mason@klaviyo-demo.com",
            phone_number: "+15005550006",
            external_id: "63f64a2b-c6bf-40c7-b81f-bed08162edbe",
            first_name: "Sarah",
            last_name: "Mason",
            organization: "Klaviyo",
            title: "Engineer",
            image:
              "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
            location: {
              address1: "89 E 42nd St",
              address2: "1st floor",
              city: "New York",
              country: "United States",
              region: "NY",
              zip: "10017",
              timezone: "America/New_York",
            },
            properties: { newKey: "New Value" },
          },
        },
      },
      {
        headers: {
          accept: "application/json",
          revision: "2023-02-22",
          "content-type": "application/json",
          Authorization: "pk_5c81ddf31406397ed532f78a84575abacb",
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};
