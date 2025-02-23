const streams = require("streamroller");

import {FileAppender} from "../../../src/appenders/components/FileAppender";
import {levels, LogEvent} from "../../../src";
import {expect, Sinon} from "../../tools";

describe("FileAppender", () => {
  it("should log something", () => {
    // GIVEN
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
    const appender = new FileAppender({type: "console", filename: "log.log"});

    const writeStub = Sinon.stub((appender as any).writer, "write");

    appender.write(logEvent);

    // WHEN
    appender.shutdown();
    appender.reopen();

    // THEN
    writeStub.should.have.been.called;
    expect(writeStub.getCall(0).args[0]).to.contains("[DEBUG] [test]");

    writeStub.restore();
  });
});
