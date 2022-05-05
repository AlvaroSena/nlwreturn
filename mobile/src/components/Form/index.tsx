import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackType } from '../Widget/index';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { captureScreen } from 'react-native-view-shot';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackSent, onFeedbackCanceled }: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)

  const handleTakeScreenshot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error))
  }


  const handleRemoveScreenshot = () => {
    setScreenshot(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          >
          </Image>
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não esta funcionando bem?"
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}> 
        <ScreenshotButton 
          onTakeShot={handleTakeScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />
        <Button 
          isLoading={false}
        />
      </View>
    </View>
  );
}