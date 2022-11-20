
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Textarea from 'react-native-textarea';


const colorcode = []
const cardsarr = []
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", dataloaded: false, isclick: false,
      colorpressed: false, title: "", desc: "",
      morepressed: false, data: null, selectcolor: ""
    };
  }
  getData = async () => {
    fetch("https://demo2965432.mockable.io/highon/colors", {
      method: "GET",
    }) //fetching all the mentors data
      .then((response) => {
        return response.json();
      })
      .then(async (responseJSON) => {

        console.log(responseJSON.data[0].code)

        for (let i = 0; i < responseJSON.data.length; i++) {
          var o = { code: responseJSON.data[i].code, cp: false }
          colorcode.push(o)

        }
        console.log(colorcode)

        this.setState({
          data: responseJSON.data,
          dataloaded: true,
          // dupdata: d,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async componentDidMount() {
    await this.getData();
  }
  SearchFilterFunction = async (text) => {
    //Time is not sufficient to do this
  }
  
  

render() {
  if (this.state.dataloaded) {
    return (

      <ScrollView>
        <View style={styles.container}>
          <View>
            {!this.state.isclick && (
              <SearchBar

                inputContainerStyle={styles.searchContainer}
                showLoadingIcon={true}
                containerStyle={styles.searchSubContainer}
                searchIcon={{ size: 20 }}
                onChangeText={(text) => this.setState({ search: text })}
                onClear={(text) => this.SearchFilterFunction("")}
                placeholder="search"
                value={this.state.search}
              ></SearchBar>
            )
            }
            {!this.state.isclick && (
              <TouchableOpacity
                style={[{ marginLeft: 8 }, styles.pressbutton]}
                onPress={() => {
                  this.setState({
                    isclick: true
                  });
                }}
              >
                <View style={{ flexDirection: "row", marginHorizontal: 10, alignItems: "center", justifyContent: "center", margin: 5 }}>
                  <Text style={[styles.insidetext, { fontSize: 30 }]}> + </Text>

                  <Text style={[{ textAlign: "center" }, styles.insidetext]}>Create a color card  </Text>
                </View>

              </TouchableOpacity>
            )}
            {this.state.isclick && (
              <View style={styles.pressbutton}>
                <View style={{ flexDirection: "row", marginHorizontal: 10, alignItems: "center", justifyContent: "center", margin: 5 }}>


                  <Text style={[{ marginLeft: 10 }, styles.insidetext]}>Create a color card  </Text>
                </View>
                <Text style={[{ marginTop: 15 }, styles.insidetext]}>select a colour</Text>
                <View style={{ flexDirection: "row", marginVertical: 20 }}>
                  {

                    colorcode.map((item) => {
                      return (
                        <View style={{ borderWidth: item.cp ? 2 : 0, borderColor: item.cp ? "green" : "" }}>
                          <TouchableOpacity style={{ width: 40, height: 20, backgroundColor: item.code, marginHorizontal: 5 }}
                            onPress={() => {
                              this.setState({ selectcolor: item.code })
                             
                              
                            }}>

                          </TouchableOpacity>
                        </View>

                      );
                    })
                  }
                </View>
                <Text style={[{ marginTop: 15 }, styles.insidetext]}>Give a title</Text>
                <TextInput
                  style={[styles.input, {
                    fontSize: 20, height: 40,
                    width: Dimensions.get("window").width * 0.7
                  }]}
                  onChangeText={(i) => { this.setState({ title: i }) }}
                  value={this.state.title}
                  placeholder="Enter title"

                />
                <Text style={[styles.insidetext, { marginTop: 20 }]}>Description</Text>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={(i) => { this.setState({ desc: i }) }}
                  defaultValue={this.state.desc}
                  maxLength={300}
                  placeholder={"Enter description"}
                />
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity style={styles.buttonstyle}
                    onPress={() => {
                       var ci = 0
                      if (this.state.selectcolor == "#CD7F32") {
                        ci=0
                      }
                      if (
                        this.state.selectcolor == "#C8A2C8") { ci= 1  }
                      if (this.state.selectcolor == "#F8ED62") { ci=2 }
                      if (this.state.selectcolor == "#FF0000") { ci =3  }
                      if (this.state.selectcolor == "#0033FF") { ci = 4}

                      let person = { title: this.state.title, code: this.state.selectcolor, desc: this.state.desc,colind:ci };
                      cardsarr.push(person);
                      this.setState({
                        isclick: false
                      });
                    }}
                  >
                    <Text style={{ color: this.state.selectcolor, fontSize: 20, fontWeight: "bold" }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonstyle}
                    onPress={() => {
                      this.setState({
                        isclick: false
                      });
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>

              </View>
            )}
            {

              cardsarr.map((item) => {
                return (
                  <View style={{ borderWidth: 1, borderRadius: 15 ,marginVertical:10}}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: 120, height: 120, backgroundColor: item.code, margin: 12, borderRadius: 15 }} />
                      <Text style={{ margin: 12 }}>{item.desc}</Text>
                    </View>
                    
                      
                    
                    <View style={{ flexDirection: "row", padding: 5 }}>
                      {

                        this.state.morepressed &&
                        this.state.data[item.colind].data.map((i) => {
                          return (
                            <View>
                              <Text style={{ marginHorizontal: 2, fontSize: 12, fontWeight: "bold" }}>{i.quality}</Text>
                              {
                                i.traits.map((p) => {
                                  return (
                                    <Text style={{ marginHorizontal: 2, fontSize: 12 }}>{p}</Text>
                                  )

                                })
                              }
                            </View>

                          )



                        })


                      }
                    </View>
                    {
                      this.state.morepressed && (
                        <TouchableOpacity
                          style={{ alignSelf: "center", height: 60, borderRadius: 10, backgroundColor: item.code, width: Dimensions.get("window").width * 0.8, justifyContent: "center", alignItems: "center" }}
                        >
                          <Text style={[styles.insidetext, { textAlign: "center", fontSize: 25 }]}>Title</Text>
                        </TouchableOpacity>
                      )
                    }



                    <TouchableOpacity
                      onPress={() => { 
                      //item.morepressed == true ? this.setState({morepressed:true}) : this.setState({morepressed:false})
                      // if(item.morepressed == true)
                      // {
                      //   item.morepressed = false
                      // }
                      // else{
                      //   item.morepressed = true
                      // }
                      this.setState({morepressed : this.state.morepressed == true ? false : true})
                    
                    }}
                      style={{ alignSelf: "center" }}
                    >
                      <Text>see more</Text>
                    </TouchableOpacity>

                  </View>

                );
              })
            }


          </View>
        </View>
      </ScrollView>

    );
  }
  else {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  buttonstyle: {
    width: Dimensions.get("window").width * 0.25,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  textareaContainer: {
    height: 170,
    padding: 5,
    backgroundColor: '#dcdcdc',
    margin: 10,
    borderWidth: 0.5,
    width: Dimensions.get("window").width * 0.78,
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    fontSize: 18,
    color: "white",
    fontWeight: '700'
  },
  input: {

    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    color: "white",

    fontWeight: "bold",



  },
  insidetext: { fontSize: 20, fontWeight: "bold", color: "white" },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSubContainer: {
    marginVertical: 30,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "white",
    borderBottomWidth: 0,
    borderTopWidth: 0,

  },
  pressbutton: {
    backgroundColor: "gray",
    marginVertical: 8,
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.9,
    padding: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 25,
  },
});
