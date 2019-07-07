package rs.kikisp.tarmacchallenge.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Member Not found")
public class MemberNotFoundException extends RuntimeException {

}
