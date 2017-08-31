import faker from 'faker'
import _ from 'lodash'
import React from 'react'

import Ref from 'src/addons/Ref'
import getElementType, { computeElementType } from 'src/lib/getElementType'

describe('computeElementType', () => {
  it('returns user defined "as" element type', () => {
    computeElementType({}, { as: 'button' })
      .should.equal('button')
  })
  it('returns computed default element type', () => {
    computeElementType({}, {}, () => 'button')
      .should.equal('button')
  })
  it('returns default element type when compute failed', () => {
    computeElementType({}, {}, () => false)
      .should.equal('div')
  })
  it('returns "a" when has a "href" prop', () => {
    computeElementType({}, { href: faker.internet.url() })
      .should.equal('a')
  })
  it('returns "as" from defaultProps', () => {
    const defaultProps = { as: 'button' }

    computeElementType({ defaultProps }, {})
      .should.equal('button')
  })
  it('returns default element type', () => {
    computeElementType({}, {})
      .should.equal('div')
  })
})

describe('getElementType', () => {
  it('returns a withRef HOC when "as" is a string', () => {
    const ElementType = getElementType({}, { as: 'button' })
    const wrapper = shallow(<ElementType innerRef={_.noop} />)

    wrapper.should.have.tagName('button')
    wrapper.should.have.type('button')
  })

  it('returns a withRef HOC when "as" is a component', () => {
    const Component = () => <div />
    const ElementType = getElementType({}, { as: Component })
    const wrapper = shallow(<ElementType innerRef={_.noop} />)

    wrapper.should.have.tagName('div')
    wrapper.should.have.type(Ref)
  })
})
