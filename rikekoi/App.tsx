import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function App() {
  const [n, setN] = useState<string>('');
  const [ratings, setRatings] = useState<string[]>([]);
  const [x2, setX2] = useState<string>('');
  const [x3, setX3] = useState<string>('');
  const [x4, setX4] = useState<string>('');
  const [x5, setX5] = useState<string>('');
  const [M, setM] = useState<string | null>(null);

  const handleNChange = (text: string) => {
    setN(text);
    const nValue = text === '' ? 0 : parseInt(text);
    setRatings(new Array(nValue).fill(''));
  };

  const handleRatingChange = (index: number, text: string) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = text;
    setRatings(updatedRatings);
  };

  const validateRatings = (ratingValues: number[]): boolean => {
    for (let i = 0; i < ratingValues.length; i++) {
      if (ratingValues[i] < 0 || ratingValues[i] > 100) {
        Alert.alert('エラー', `${i + 1}人目の評価値は0から100の範囲内で入力してください`);
        return false;
      }
    }
    return true;
  };

  const calculateMoodValue = () => {
    const nValue = parseInt(n) || 0;
    const x2Value = parseFloat(x2) || 0;
    const x3Value = parseFloat(x3) || 0;
    const x4Value = parseFloat(x4) || 0;
    const x5Value = parseFloat(x5) || 0;

    if (nValue <= 0 || ratings.length !== nValue) {
      Alert.alert('エラー', '評価者の人数を正しく入力してください');
      return;
    }

    const ratingValues = ratings.map(r => parseFloat(r) || 0);
    
    // バリデーション
    if (!validateRatings(ratingValues)) {
      return;
    }

    const P1 = ratingValues.reduce((a, b) => a + b, 0) / 5 / nValue;

    let P2: number;
    if (x2Value === 0) {
      P2 = 20;
    } else {
      P2 = -10000 / x2Value;
    }

    const P3 = (104 - 2 * (x3Value / 20 + 20 / x3Value)) / 5;

    let P4: number;
    if (x4Value >= 0 && x4Value < 20) {
      P4 = 30 - 1000 / 100;
    } else if (x4Value >= 20 && x4Value < 70) {
      P4 = 30 - 1000 / (100 - 2 * (x4Value - 20));
    } else {
      setM('-∞');
      return;
    }

    let P5: number;
    if (x5Value > 0 && x5Value < 30) {
      P5 = 100 * x5Value / 30 / 5;
    } else if (x5Value >= 30 && x5Value <= 60) {
      P5 = 100 / 5;
    } else {
      P5 = (100 - 5 * (x5Value - 60)) / 5;
    }

    const finalM = P1 + P2 + P3 + P4 + P5;
    setM(finalM.toFixed(2) + ' md');
  };

  const renderInput = (label: string, value: string, onChangeText: (text: string) => void) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>ムード値診断ツール</Text>

          {renderInput('評価者の人数', n, handleNChange)}

          {ratings.map((rating, i) => (
            <View key={i} style={styles.inputContainer}>
              <Text style={styles.label}>{i + 1}人目の評価:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rating}
                onChangeText={text => handleRatingChange(i, text)}
              />
            </View>
          ))}

          {renderInput('こちらに注目する人間の数', x2, setX2)}
          {renderInput('その場の照度(lux)', x3, setX3)}
          {renderInput('その場の騒音値(db)', x4, setX4)}
          {renderInput('沈黙見つめ合い秒数', x5, setX5)}

          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={calculateMoodValue}>
              <Text style={styles.buttonText}>ムード値を計算する</Text>
            </TouchableOpacity>
          </View>

          {M !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>ムード値: {M}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
