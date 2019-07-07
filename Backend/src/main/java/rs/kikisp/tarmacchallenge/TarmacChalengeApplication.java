package rs.kikisp.tarmacchallenge;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import rs.kikisp.tarmacchallenge.services.MemberService;

import rs.kikisp.tarmacchallenge.domain.Member;

import java.io.InputStream;
import java.util.List;



@SpringBootApplication
public class TarmacChalengeApplication extends SpringBootServletInitializer{

	 @Override
	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	        return application.sources(TarmacChalengeApplication.class);
	    }

	    public static void main(String[] args) throws Exception {
	        SpringApplication.run(TarmacChalengeApplication.class, args);
	    }

	    @Bean
		CommandLineRunner runner(MemberService memberService){
		    return args -> {
		    	memberService.deleteAll();
				ObjectMapper mapper = new ObjectMapper();
				TypeReference<List<Member>> typeReference = new TypeReference<List<Member>>(){};
				InputStream inputStream = TypeReference.class.getResourceAsStream("/members.json");
				
					List<Member> members = mapper.readValue(inputStream,typeReference);
					for (Member member : members) {
						memberService.saveMember(member);
					}
					
		    };
	}
}
