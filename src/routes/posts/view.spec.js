const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const rewire = require('rewire');

const list = rewire('./view');

describe('Posts - View', () => {
    let request;
    let response;
    let nextStub;

    beforeEach(() => {
        request = httpMocks.createRequest({
            params: {
                postId: '123'
            }
        });
        response = httpMocks.createResponse();
        nextStub = sinon.stub();
    });

    describe('GET', () => {
        let findOneStub;
        const testPost = {
            _id: '123',
            title: 'Test Title',
            body: 'Test Body',
            creationDate: Date.now()
        };

        beforeEach(() => {
            class MockPost {
                static findOne() {}
            }
            findOneStub = sinon.stub(MockPost, 'findOne').resolves(testPost);
            list.__set__('Post', MockPost);
        });
        it('should lookup all posts', () => {
            return list.get(request, response, nextStub).then(() => {
                expect(findOneStub.calledOnce).to.be.true;
                expect(findOneStub.calledWithExactly({ _id: '123' })).to.be
                    .true;
            });
        });
        it('should render view view', () => {
            const renderSpy = sinon.spy(response, 'render');
            return list.get(request, response, nextStub).then(() => {
                expect(response.statusCode).to.equal(200);
                expect(renderSpy.calledOnce).to.be.true;
                expect(
                    renderSpy.calledWithExactly('post', {
                        post: testPost
                    })
                ).to.be.true;
                expect(nextStub.called).to.be.false;
            });
        });

        it('should send 500 status on error', () => {
            const err = new Error('TestError');
            findOneStub.rejects(err);
            return list.get(request, response, nextStub).then(() => {
                expect(response.statusCode).to.equal(500);
                expect(nextStub.calledOnce).to.be.true;
                expect(nextStub.calledWithExactly(err)).to.be.true;
            });
        });
    });
});
