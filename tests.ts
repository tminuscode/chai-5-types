import {use, expect } from 'chai';
import chaiAlmost from 'chai-almost';
import ChaiArrays from 'chai-arrays';
import chaiSpies from 'chai-spies';
import chaiQuantifiers from 'chai-quantifiers';
import ChaiJsonSchema from 'chai-json-schema';

use(chaiAlmost())
use(ChaiArrays)
use(chaiQuantifiers)
const { tv4 } = use(ChaiJsonSchema);

describe('chai-5', () => {
  it('chai-almost', () => {
    expect(1.0000001).to.almost.equal(1);
  })

  it('chai-arrays', () => {
    expect([]).to.be.array();
    expect('str').not.to.be.array();
  })

  it('chai-spies', () => {
    const chai = use(chaiSpies);
    const spy = chai.spy(() => {});
    spy();
    expect(spy).to.have.been.called();
  })

  it('chai-quantifiers', () => {
    const assertion = expect([0, 1, 2, 3]);
    assertion.to.containAll<number>((item) => item < 4);
  })

  it('chai-json-schema', () => {
    const goodApple = {
      skin: "thin",
      colors: ["red", "green", "yellow"],
      taste: 10,
    };

    const fruitSchema = {
      title: "fresh fruit schema v1",
      type: "object",
      required: ["skin", "colors", "taste"],
      properties: {
        colors: {
          type: "array",
          minItems: 1,
          uniqueItems: true,
          items: {
            type: "string",
          },
        },
        skin: {
          type: "string",
        },
        taste: {
          type: "number",
          minimum: 5,
        },
      },
    };
    expect(goodApple).to.be.jsonSchema(fruitSchema);
  })

  it('chai-json-schema tv4', () => {
    const schema = {
      items: {
        type: "boolean",
      },
    };

    const data1 = [true, false];
    expect(tv4.validate(data1, schema)).to.be.true;
  })
});
