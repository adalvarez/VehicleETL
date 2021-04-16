import ICsvToJSON from "../../src/utils/ICsvToJSON";
import MockExtraction from "../fixtures/data.extraction.json";


describe(`Transformers utils.`, ()=>{

  test(`Transform csv file into JSON Array`, async ()=>{
    const payload = `tests/fixtures/data.csv`;
    const actual = await ICsvToJSON(payload);
    const expected = MockExtraction;
    expect(actual instanceof Array).toBeTruthy();
    expect(actual).toHaveLength(1);
    // Inspect first element
    expect(actual[0] instanceof Object).toBeTruthy();
    expect(Object.keys(actual[0])).toHaveLength(10);
    expect(actual).toEqual(expected);
  });
  
});