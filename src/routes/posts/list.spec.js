const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const rewire = require('rewire');

const list = rewire('./list');

describe('Posts - List', () => {
    let request;
    let response;
    let nextStub;

    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        nextStub = sinon.stub();
    });

    describe('GET', () => {
        let findStub;

        beforeEach(() => {
            class MockPost {
                static find() {}
            }
            findStub = sinon.stub(MockPost, 'find').resolves([]);
            list.__set__('Post', MockPost);
        });
        it('should lookup all posts', () => {
            return list.get(request, response, nextStub).then(() => {
                expect(findStub.calledOnce).to.be.true;
                expect(findStub.calledWithExactly());
            });
        });
        it('should render list view', () => {
            const renderSpy = sinon.spy(response, 'render');
            return list.get(request, response, nextStub).then(() => {
                expect(response.statusCode).to.equal(200);
                expect(renderSpy.calledOnce).to.be.true;
                expect(
                    renderSpy.calledWithExactly('index', {
                        title: 'Matt\'s Blog',
                        posts: []
                    })
                ).to.be.true;
                expect(nextStub.called).to.be.false;
            });
        });

        it('should send 500 status on error', () => {
            const err = new Error('TestError');
            findStub.rejects(err);
            return list.get(request, response, nextStub).then(() => {
                expect(response.statusCode).to.equal(500);
                expect(nextStub.calledOnce).to.be.true;
                expect(nextStub.calledWithExactly(err)).to.be.true;
            });
        });
    });
});
