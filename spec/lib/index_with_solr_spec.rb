require File.dirname(__FILE__) + '/../spec_helper'

describe 'Index With Solr' do

  before(:all) do
    Language.create_english
    @solr_connection = SolrAPI.new($SOLR_SERVER, $SOLR_SITE_SEARCH_CORE)
  end
  
  after(:all) do
    # remove callbacks
    class GlossaryTerm < SpeciesSchemaModel
      remove_index_with_solr
    end
  end
  
  it 'should define new methods and set callback functions' do
    gt = GlossaryTerm.create(:term => 'trusted', :definition => 'Firm reliance on the integrity, ability, or character of a person or thing')
    gt.respond_to?('add_to_index').should == false
    gt.respond_to?('remove_from_index').should == false
    gt.class.after_save.detect{ |callback| callback.method == :add_to_index}.should == nil
    gt.class.before_destroy.detect{ |callback| callback.method == :remove_from_index}.should == nil
    gt.destroy
    
    # add callbacks and make sure they exist
    class GlossaryTerm < SpeciesSchemaModel
      index_with_solr :keywords => [:term, :definition]
    end
    
    gt = GlossaryTerm.create(:term => 'honor', :definition => 'integrity')
    gt.respond_to?('add_to_index').should == true
    gt.respond_to?('remove_from_index').should == true
    gt.class.after_save.detect{ |callback| callback.method == :add_to_index}.should_not == nil
    gt.class.before_destroy.detect{ |callback| callback.method == :remove_from_index}.should_not == nil
    gt.destroy
    
    # remove callbacks and make sure they are gone again
    class GlossaryTerm < SpeciesSchemaModel
      remove_index_with_solr
    end
    
    gt = GlossaryTerm.create(:term => 'honor', :definition => 'integrity')
    gt.respond_to?('add_to_index').should == false
    gt.respond_to?('remove_from_index').should == false
    gt.class.after_save.detect{ |callback| callback.method == :add_to_index}.should == nil
    gt.class.before_destroy.detect{ |callback| callback.method == :remove_from_index}.should == nil
    gt.destroy
  end
  
  it 'should index the object on creation' do
    # add callbacks - they will exist for the remainder of the tests
    class GlossaryTerm < SpeciesSchemaModel
      index_with_solr :keywords => [:term, :definition]
    end
    
    @solr_connection.delete_all_documents
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm')['response']['docs']
    docs.size.should == 0
    
    term = 'honor'
    definition = 'integrity'
    gt = GlossaryTerm.create(:term => term, :definition => definition)
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm')['response']['docs']
    docs.size.should == 2
    
    term_result = docs.detect{ |h| h['keyword_type'] == 'term' }
    term_result['keyword'].should == [term]
    term_result['keyword_exact'].should == [term]
    term_result['resource_id'].should == gt.id
    term_result['language'].should == Language.english.iso_code
    
    definition_result = docs.detect{ |h| h['keyword_type'] == 'definition' }
    definition_result['keyword'].should == [definition]
    definition_result['keyword_exact'].should == [definition]
    definition_result['resource_id'].should == gt.id
    definition_result['language'].should == Language.english.iso_code
  end
  
  it 'should update the index records on update' do
    @solr_connection.delete_all_documents
    term = 'honor'
    definition = 'integrity'
    gt = GlossaryTerm.create(:term => term, :definition => definition)
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm AND keyword:honor')['response']['docs']
    docs.size.should == 1
    
    gt.term = 'dishonor'
    gt.save
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm AND keyword:honor')['response']['docs']
    docs.size.should == 0
    
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm AND keyword:dishonor')['response']['docs']
    docs.size.should == 1
  end
  
  it 'should remove index records on destroy' do
    @solr_connection.delete_all_documents
    term = 'honor'
    definition = 'integrity'
    gt = GlossaryTerm.create(:term => term, :definition => definition)
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm AND keyword:honor')['response']['docs']
    docs.size.should == 1
    
    gt.destroy
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm AND keyword:honor')['response']['docs']
    docs.size.should == 0
  end
  
  it 'should index based on methods as well as fields' do
    exception = false
    class GlossaryTerm < SpeciesSchemaModel
      index_with_solr :keywords => [:term, :definition, :some_new_method]
      
      def some_new_method
        term + " :: " + definition
      end
    end
    
    term = 'honor'
    definition = 'integrity'
    gt = GlossaryTerm.create(:term => term, :definition => definition)
    docs = @solr_connection.query_lucene('resource_type:GlossaryTerm AND keyword:honor')['response']['docs']
    docs.size.should == 2
    
    new_method_result = docs.detect{ |h| h['keyword_type'] == 'some_new_method' }
    new_method_result['keyword'].should == [term + " :: " + definition]
    new_method_result['keyword_exact'].should == [term + " :: " + definition]
    new_method_result['resource_id'].should == gt.id
    new_method_result['language'].should == Language.english.iso_code
  end
  
  it 'should throw an error if the field to index on doesnt exist' do
    exception = false
    class GlossaryTerm < SpeciesSchemaModel
      index_with_solr :keywords => [:term, :definition, :some_nonsense]
    end
    
    begin
      GlossaryTerm.create(:term => 'trusted', :definition => 'integrity')
    rescue Exception => e
      exception = e
    end
    exception.should_not == false
    exception.message.should == "NoMethodError: undefined method `some_nonsense' for GlossaryTerm"
  end
end
