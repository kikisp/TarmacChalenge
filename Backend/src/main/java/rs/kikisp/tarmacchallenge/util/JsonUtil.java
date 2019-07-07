package rs.kikisp.tarmacchallenge.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public abstract class JsonUtil {
	
	private static ObjectMapper mapper = new ObjectMapper();

	public static ObjectNode generateMessageObject(String message) {
		ObjectNode toReturn = mapper.createObjectNode();
		toReturn.put("message", message);
		return toReturn;
	}
	
}
