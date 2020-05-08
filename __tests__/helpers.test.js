import {
  statusAnswer,
  encodeData,
} from '../src/utils/helpers';

// expect.extend({
//   isBoolean(var) {
//     console.log('extended var: ', var);
//     const result = (typeof var === 'boolean') ? true : false;
//   };
// });

describe('Функция statusAnswer', () => {
  test('Должна отработать', async () => {
    const result = await statusAnswer(true, '01', 'Authentication failed', 'some value');

    expect(result).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.any(String),
      }),
    );
  });

  test('Должна отработать с true', async () => {
    const result = await statusAnswer(true, '01', 'Authentication failed', 'some value');

    expect(result).toEqual(
      expect.objectContaining({
        error: true,
        status: '01',
        text: 'Authentication failed',
        value: 'some value',
      }),
    );
  });

  test('Должна отработать с false', async () => {
    const result = await statusAnswer(false, '00', 'OK', 'some value');

    expect(result).toEqual(
      expect.objectContaining({
        error: false,
        status: '00',
        text: 'OK',
        value: 'some value',
      }),
    );
  });

  test('Должна отработать без value', async () => {
    const result = await statusAnswer(false, '00', 'OK');

    expect(result).toEqual(
      expect.objectContaining({
        error: false,
        status: '00',
        text: 'OK',
      }),
    );
    expect(result.value).toBeNull();
  });

  test('Не должна отработать c типом Number вместо Boolean', async () => {
    const result = await statusAnswer(134, '00', 'OK');
    // TODO: придумать как заставить JEST обрабатывать значение этого поля:
    // result[0].context.value
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.any(String),
          context: expect.objectContaining({
            label: expect.any(String),
            key: expect.any(String),
          }),
        }),
      ]),
    );
  });

  test('Не должна отработать c типом Object вместо Boolean', async () => {
    const result = await statusAnswer({ kek: 'pizza' }, '00', 'OK');
    // TODO: придумать как заставить JEST обрабатывать значение этого поля:
    // result[0].context.value
    console.log('Не должна отработать c типом Number вместо Boolean: ', result[0]);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.any(String),
          context: expect.objectContaining({
            label: expect.any(String),
            key: expect.any(String),
          }),
        }),
      ]),
    );
  });
});

describe('Function encodeData', () => {
  test('Function work', async () => {
    const result = await encodeData('Я тебе точно, нахрен, чо-нить кого-нить где-нить когда-нить, понял?');
    expect(result).toBe('0K8g0YLQtdCx0LUg0YLQvtGH0L3Qviwg0L3QsNGF0YDQtdC9LCDRh9C+LdC90LjRgtGMINC60L7Qs9C+LdC90LjRgtGMINCz0LTQtS3QvdC40YLRjCDQutC+0LPQtNCwLdC90LjRgtGMLCDQv9C+0L3Rj9C7Pw==')
    // expect(result).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       message: expect.any(String),
    //       context: expect.objectContaining({
    //         label: expect.any(String),
    //         key: expect.any(String),
    //       }),
    //     }),
    //   ]),
    // );
  });
});
