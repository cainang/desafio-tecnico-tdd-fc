import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund copy";
import { PartialRefund } from "./partial_refund";
import { RefundRuleFactory } from "./refund_rule_factory";

describe("RefundRuleFactory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    expect(RefundRuleFactory.getRefundRule(8)).toBeInstanceOf(FullRefund);
    expect(RefundRuleFactory.getRefundRule(12)).toBeInstanceOf(FullRefund);
    expect(RefundRuleFactory.getRefundRule(9)).toBeInstanceOf(FullRefund);
    expect(RefundRuleFactory.getRefundRule(15)).toBeInstanceOf(FullRefund);
  });

  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    expect(RefundRuleFactory.getRefundRule(1)).toBeInstanceOf(PartialRefund);
    expect(RefundRuleFactory.getRefundRule(3)).toBeInstanceOf(PartialRefund);
    expect(RefundRuleFactory.getRefundRule(5)).toBeInstanceOf(PartialRefund);
    expect(RefundRuleFactory.getRefundRule(6)).toBeInstanceOf(PartialRefund);
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    expect(RefundRuleFactory.getRefundRule(0)).toBeInstanceOf(NoRefund);
  });
});
