package com.iacit.api.repository;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.iacit.api.entity.Umidade;


public interface UmidadeRepository extends JpaRepository<Umidade, Integer> {
@Query(value = "select * from umidade where est_codigo = ?1 AND umi_data_hora BETWEEN ?2 AND ?3", nativeQuery = true)
	
	public List<Umidade> findByest_codigoAndumi_data_hora(String estCodigo, Timestamp dataInicial, Timestamp dataFinal);
}
