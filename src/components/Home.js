import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  Animated,
} from "react-native";
import Apploading from "expo-app-loading";

import * as Font from "expo-font";
         
import { Categories, COLOURS } from "../database/items";
import Material from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

const Home = ({ navigation }) => {
  const [currentSelected, setCurrentSelected] = useState([0]);
  const [fontLoaded, setFontLoaded] = React.useState(false);

  const RevealAnim = useRef(new Animated.Value(1)).current;
  const RevealAnimater = useRef(new Animated.Value(0)).current;
  const raceStart = useRef(new Animated.Value(-50)).current;
  const raceStart1 = useRef(new Animated.Value(-100)).current;
  const revealFood = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Font.loadAsync({
      scriptF: require("../database/Script.ttf"),
    }).then(() => {
      setFontLoaded(true);
    });
  }, []);
  const starting = () => {
    Animated.spring(raceStart, {
      toValue: 0,
      tension: 90,
      friction: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      raceStart.setValue(25);
    });
  };
  const revealFoods = () => {
    Animated.spring(revealFood, {
      toValue: 10,
      tension: 200,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      revealFood.setValue(0);
    });
  };

  useEffect(() => {
    Animated.spring(RevealAnim, {
      delay: 200,
      toValue: 0,
      friction: 1,
      tension: 10,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.spring(raceStart1, {
      toValue: 0,
      tension: 100,
      friction: 1,
      delay: 3000,
      useNativeDriver: true,
    }).start(raceStart1.setValue(0));
  }, []);

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => (setCurrentSelected(index), revealFoods())}
      >
        <Animated.View
          style={{
            width: 120,
            height: 180,
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              currentSelected == index ? COLOURS.accent : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 20,
            transform: [{ translateX: raceStart1 }],
          }}
        >
          <View style={{ width: 60, height: 60 }}>
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "center",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: "600",
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor:
                currentSelected == index ? COLOURS.white : COLOURS.accentRed,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="angle-right"
              style={{
                fontSize: 12,
                color: currentSelected == index ? COLOURS.black : COLOURS.white,
              }}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderItems = (data, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={{
          width: "100%",
          height: 180,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.push("details", {
            name: data.name,
            price: data.price,
            image: data.image,
            size: data.size,
            crust: data.crust,
            delivery: data.delivery,
            ingredients: data.ingredients,
            isTopOfTheWeek: data.isTopOfTheWeek,
            navigation: navigation+1,
          })
        }
      >
        <View
          style={{
            width: "90%",
            height: 160,
            backgroundColor: COLOURS.white,
            borderRadius: 20,
            elevation: 4,
            position: "relative",
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginBottom: 50 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                display: data.isTopOfTheWeek ? "flex" : "none",
              }}
            >
              <FontAwesome
                name="crown"
                style={{
                  fontSize: 10,
                  color: COLOURS.accent,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.black,
                  opacity: 0.8,
                  marginLeft: 5,
                }}
              >
                top of the week
              </Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                color: COLOURS.black,
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                opacity: 0.5,
              }}
            >
              {data.weight}
            </Text>
          </View>
          <View style={{ width: 150, height: 150, marginRight: -45 }}>
            <Image
              source={data.image}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 85,
                height: 50,
                backgroundColor: COLOURS.accent,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo
                name="plus"
                style={{ fontSize: 18, color: COLOURS.black }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <AntDesign
                name="star"
                style={{ fontSize: 12, color: COLOURS.black, paddingRight: 5 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: COLOURS.black,
                  fontWeight: "bold",
                }}
              >
                {data.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={true}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLOURS.accentBg,
            position: "relative",
          }}
        >
          <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
          <Image
            source={require("../database/images/background.png")}
            style={{ position: "absolute", top: 0, left: -100 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
              }}
            >
              <Image
                source={require("../database/images/profile.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                  borderRadius: 500,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons
                name="location-outline"
                style={{
                  fontSize: 28,
                  color: "red",
                }}
              />
              {fontLoaded ? (
                <Text style={{ fontFamily: "scriptF", fontSize: 28 }}>
                  Abu Dhabi
                </Text>
              ) : (
                <Text style={{ fontSize: 28 }}>Abu Dhabi</Text>
              )}
              <Ionicons
                name="chevron-down"
                size={20}
                style={{
                  color: COLOURS.black,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Material
                name="segment"
                style={{
                  fontSize: 28,
                  color: COLOURS.black,
                }}
              />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={{
              padding: 20,
              width: "100%",
              height: 200,
              borderRadius: 100,
              transform: [{ translateX: raceStart }],
            }}
          >
            <Image
              source={require("../database/images/fastest-food.jpg")}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 35,
              }}
            />
          </Animated.View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ffca4e7f",
              shadowColor: "black",
              shadowOffset: {
                width: 100,
                height: 102,
              },
              shadowRadius: 4.84,
              shadowOpacity: 0.25,
              elevation: 55,
            }}
          >
            <TouchableOpacity onPress={starting}>
              {fontLoaded ? (
                <Text
                  style={{
                    fontSize: 32,
                    textAlign: "center",
                    width: "50%",
                    color: "white",
                    fontFamily: "scriptF",
                  }}
                >
                  Our job is Filling your tummy with delicious food and fast
                  dlivery
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 32,
                    textAlign: "center",
                    width: "35%",
                    color: "white",
                    // fontFamily: "scriptF",
                  }}
                >
                  Our job is Filling your tummy with delicious food and fast
                  delivery
                  <Text style={{ fontSize: 20 }}> ~~~Font loading~~~~</Text>
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: "700",
              color: COLOURS.black,
              letterSpacing: 1,
            }}
          >
            Categories
          </Text>
          <FlatList
            horizontal={true}
            data={Categories}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: "700",
              color: COLOURS.black,
            }}
          >
            Popular
          </Text>
          <Animated.View style={{ transform: [{ translateX: revealFood }] }}>
            {Categories[currentSelected].items.map(renderItems)}
          </Animated.View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 50,
              backgroundColor: "black",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  color: COLOURS.white,
                  fontSize: 30,
                  borderWidth: 2,
                  borderColor: "aqua",
                  padding: 10,
                }}
              >
                Follow us on
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={{ marginBottom: 10 }}>
                <Entypo
                  name="facebook"
                  size={35}
                  style={{
                    color: "#297be5",
                    borderWidth: 1.3,
                    backgroundColor: "white",
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginBottom: 10 }}>
                <Entypo
                  name="twitter"
                  size={35}
                  style={{
                    color: "#1a8cd8",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginBottom: 10 }}>
                <Entypo
                  name="instagram"
                  size={35}
                  style={{
                    color: "#aa2fb3",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="youtube"
                  size={35}
                  style={{
                    color: "red",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
