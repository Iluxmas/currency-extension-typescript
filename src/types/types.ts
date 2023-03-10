interface IMessage {
  type: MessageType;
}

interface IMessageOther {
  type: MessageType.getCodes | MessageType.getStatus;
}

interface IMessageGetCurrency extends IMessage {
  type: MessageType.getRate;
  value: string;
}

export type TAllMessage = IMessageGetCurrency | IMessageOther;

export enum MessageType {
  getRate = 'getRate',
  getCodes = 'getCodes',
  getStatus = 'getStatus',
}

export type TPairs = string[][];

export type TRatio = {
  [key: string]: {
    base: string;
    date: string;
    rates: {
      [key: string]: number;
    };
    success: boolean;
    timestamp: number;
  };
};
