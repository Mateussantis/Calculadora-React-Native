import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultadoTexto: "",
      calculoTexto: ""
    }
    this.operacoes = ['DEL', '+', '-', '*', '/']
  }

  calcular = () => {
    let text = this.state.resultadoTexto
    
    this.setState({
      calculoTexto: eval(text)
    })

  }

  pressionar = (text) => {
    
    if (text == '=') {
      return this.validar() && this.calcular()
    }
    
    this.setState({
      resultadoTexto: this.state.resultadoTexto + text
    })

  }

  validar = () => {
    let text = this.state.resultadoTexto

    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true

  }


  operate = (operacoes) => {
    let ultimo = this.state.resultadoTexto.slice(-1)
    this.validar()
    switch (operacoes) {
      case 'DEL':
        if (ultimo == '+' || ultimo == '-' || ultimo == '*' || ultimo == '/') {
          let text = this.state.resultadoTexto.split('')
          text.pop()
          this.setState({
            resultadoTexto: text.join('')
          })
        }
        else {
          let text = this.state.resultadoTexto.split('')
          let a = this.state.resultadoTexto
          
          text.pop()
          this.setState({
            resultadoTexto: text.join(''),
          })

          this.setState({
            calculoTexto: eval(a)
          })

        }
        break
      case '+':
      case '-':
      case '*':
      case '/':
        this.validar()
        const ultimoCaractere = this.state.resultadoTexto.split('').pop()

        if (this.operacoes.indexOf(ultimoCaractere) > 0) return

        if (this.state.text == "") return
        this.setState({
          resultadoTexto: this.state.resultadoTexto + operacoes
        })

    }
  }


  render = () => {
    let linhas = []
    let numeros = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]

    for (let i = 0; i < 4; i++) {
      let linha = []

      for (let j = 0; j < 3; j++) {
        linha.push(
          <TouchableOpacity key={numeros[i][j]} style={styles.btn}>
            <Text style={styles.btnTexto} onPress={() => this.pressionar(numeros[i][j])}>{numeros[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      linhas.push(
        <View key={i} style={styles.linha}>{linha}</View>
      )
    }

    let ops = []

    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity key={this.operacoes[i]} style={styles.btn}>
          <Text style={[styles.btnTexto, styles.white]} onPress={() => this.operate(this.operacoes[i])}>{this.operacoes[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>{this.state.resultadoTexto}</Text>
        </View>
        <View style={styles.calculo}>
          <Text style={styles.calculoTexto}>{this.state.calculoTexto}</Text>
        </View>
        <View style={styles.botoes}>
          <View style={styles.numeros}>
            {linhas}
          </View>
          <View style={styles.operacoes}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultado: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculo: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  botoes: {
    flex: 7,
    flexDirection: 'row'
  },
  numeros: {
    flex: 3,
    backgroundColor: '#434343'
  },
  operacoes: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  linha: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  resultadoTexto: {
    fontSize: 30,
    color: 'black'
  },
  calculoTexto: {
    fontSize: 24,
    color: 'black'
  },
  btnTexto: {
    fontSize: 30,
    color: 'white'
  },
  white: {
    color: 'white'
  }


});