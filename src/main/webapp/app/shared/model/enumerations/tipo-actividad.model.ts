export const enum TipoActividad {
  PREGUNTA_TEXTO = 'pregunta_texto',
  PREGUNTA_AUDIO = 'pregunta_audio'
}

export const enum SubTipoActividad {
  TEXTO = 'texto',
  IMAGEN = 'imagen',
  AUDIO = 'audio',
  VERDADERO_FALSO = 'verdaderoFalso'
}

export const enum OpcionPreguntas {
  UNICA = 'unica',
  MULTIPLE = 'multiple'
}

export const enum OpcionConcatenada {
  PREG_TEXTO_RESP_UNICA_TEXTO = 'prep_texto_resp_unica_texto',
  PREG_TEXTO_RESP_MULTIPLE_TEXTO = 'prep_texto_resp_multiple_texto',
  PREG_TEXTO_RESP_UNICA_VERDADEROFALSO = 'preg_texto_resp_unica_verdaderoFalso',
  PREG_TEXTO_RESP_UNICA_IMAGEN = 'preg_texto_resp_unica_imagen',
  PREG_TEXTO_RESP_MULTIPLE_IMAGEN = 'preg_texto_resp_multiple_imagen',
  PREG_TEXTO_RESP_UNICA_AUDIO = 'preg_texto_resp_unica_audio',
  PREG_TEXTO_RESP_MULTIPLE_AUDIO = 'preg_texto_resp_multiple_audio',
  PREG_AUDIO_RESP_UNICA_TEXTO = 'preg_audio_resp_unica_texto',
  PREG_AUDIO_RESP_MULTIPLE_TEXTO = 'preg_audio_resp_multiple_texto',
  PREG_AUDIO_RESP_UNICA_VERDADEROFALSO = 'preg_audio_resp_unica_verdaderoFalso',
  PREG_AUDIO_RESP_UNICA_IMAGEN = 'preg_audio_resp_unica_imagen',
  PREG_AUDIO_RESP_MULTIPLE_IMAGEN = 'preg_audio_resp_multiple_imagen',
  PREG_AUDIO_RESP_UNICA_AUDIO = 'preg_audio_resp_unica_audio',
  PREG_AUDIO_RESP_MULTIPLE_AUDIO = 'preg_audio_resp_multiple_audio'
}
