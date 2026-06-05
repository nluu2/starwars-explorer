const styleMock = new Proxy({}, { get: (_target, prop) => prop })

export default styleMock
